import {
  Button,
  Flex,
  Text,
  Heading,
  IconButton,
  Image as ChakraImage,
  chakra,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { formatUnits } from "ethers";
import React, { useMemo } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { Loader } from "./Loader";
import { useInvoiceStatus } from "../hooks/useInvoiceStatus";
import {
  dateTimeToDate,
  getTokenInfo,
  getHexChainId,
  unixToDateTime,
} from "../utils";
import { VerticalDotsIcon } from "../icons/VerticalDots";
import { RightArrowIcon, LeftArrowIcon } from "../icons/ArrowIcons";
import { Styles } from "../pages/invoices/InvoicesStyles";
// import { GenerateInvoicePDFMenuItem } from "./GenerateInvoicePDF";
import { FilterIcon } from "../icons/FilterIcon";
import { InvoiceResult } from "@/graphql/subgraph";
import { Chain, ChainId } from "@/utils";

type InvoiceComponentProps = {
  invoice: InvoiceResult;
};

type InvoiceStatusLabelProps = InvoiceComponentProps & {
  onClick?: () => void;
  cursor?: string;
};

const InvoiceStatusLabel: React.FC<InvoiceStatusLabelProps> = ({
  invoice,
  ...props
}) => {
  const { funded, label, loading } = useInvoiceStatus(invoice);
  const { isLocked, terminationTime } = invoice;
  const terminated = terminationTime.gt(Date.now());
  const disputeResolved = label === "Dispute Resolved";
  return (
    <Flex
      backgroundColor={
        loading
          ? "#FFFFFF"
          : terminated || disputeResolved || label === "Expired"
          ? "#C2CFE0"
          : isLocked
          ? "#F7685B"
          : label === "Overdue"
          ? "#F7685B"
          : funded
          ? "#2ED47A"
          : "#FFB946"
      }
      padding="6px"
      borderRadius="10"
      minWidth="165px"
      justify="center"
      {...props}
    >
      <Text color="white" fontWeight="bold" textAlign="center" fontSize="15px">
        {loading ? <Loader size="20" /> : label}
      </Text>
    </Flex>
  );
};

type InvoiceBadgeProps = InvoiceComponentProps;

const InvoiceBadge: React.FC<InvoiceBadgeProps> = ({ invoice, ...props }) => {
  // const { invoiceType } = invoice; //TODO: source this from the subgraph
  const invoiceType = "unknown";
  const schemes = {
    escrow: {
      bg: "rgba(128, 63, 248, 0.3)",
      color: "rgba(128, 63, 248, 1)",
    },
    instant: {
      bg: "rgba(248, 174, 63, 0.3)",
      color: "rgba(248, 174, 63, 1)",
    },
    unknown: {
      bg: "rgba(150,150,150,0.3)",
      color: "rgba(150,150,150,1)",
    },
  };

  return (
    <Badge
      backgroundColor={schemes[invoiceType ?? "unknown"].bg}
      color={schemes[invoiceType ?? "unknown"].color}
      maxW="fit-content"
      height="fit-content"
    >
      {invoiceType ? invoiceType.toUpperCase() : "UNKNOWN"}
    </Badge>
  );
};

export type Router = {
  push: (path: string) => void;
};

export type InvoiceDashboardTableProps = {
  result: InvoiceResult[];
  tokenData: any;
  chainId?: number;
  router: Router;
};

type Details = {
  createdAt: string;
  projectName: React.ReactElement;
  amount: string;
  currency: React.ReactElement;
  status: React.ReactElement;
  action: React.ReactElement;
};

export const InvoiceDashboardTable: React.FC<InvoiceDashboardTableProps> = ({
  result,
  tokenData,
  chainId,
  router,
}) => {
  const data = useMemo(() => {
    if (!chainId || !result || !tokenData) return [];
    const dataArray = [] as Details[];
    result.forEach((invoice, index) => {
      const { decimals, symbol, image } = getTokenInfo(
        chainId as ChainId,
        invoice.token,
        tokenData
      );
      const viewInvoice = () =>
        router.push(
          `/invoice/${getHexChainId(invoice.network as Chain)}/${
            invoice.address
          }/`
          //${invoice.invoiceType !== "escrow" ? invoice.invoiceType : ""}`
        );
      const details = {
        createdAt: dateTimeToDate(unixToDateTime(invoice.createdAt.num)),
        projectName: (
          <Flex
            gap={2}
            width="100%"
            align="center"
            justify="space-between"
            onClick={viewInvoice}
          >
            <Link
              href={`/invoice/${getHexChainId(invoice.network as Chain)}/${
                invoice.address
              }/`}
              //${invoice.invoiceType !== "escrow" ? invoice.invoiceType : ""}`}
            >
              {invoice.projectName}
            </Link>
            <InvoiceBadge invoice={invoice} />
          </Flex>
        ),
        amount: formatUnits(invoice.total.num, decimals),
        currency: (
          <Flex justify="left" gap={2}>
            <ChakraImage
              src={image}
              width="24px"
              height="24px"
              objectFit="contain"
            />
            <Text>{symbol}</Text>
          </Flex>
        ),
        status: (
          <InvoiceStatusLabel
            invoice={invoice}
            onClick={viewInvoice}
            cursor="pointer"
          />
        ),
        action: (
          <Menu>
            <MenuButton padding={0} width="fit-content">
              <VerticalDotsIcon />
            </MenuButton>
            <MenuList backgroundColor="white" textColor="black">
              <MenuItem
                _active={{
                  backgroundColor: "rgba(61, 136, 248, 0.8)",
                  color: "white",
                }}
                _hover={{
                  backgroundColor: "rgba(61, 136, 248, 0.8)",
                  color: "white",
                }}
                onClick={viewInvoice}
              >
                Manage
              </MenuItem>
              {/* <GenerateInvoicePDFMenuItem
                invoice={invoice}
                symbol={symbol}
                text="Download"
                _active={{
                  backgroundColor: "rgba(61, 136, 248, 0.8)",
                  color: "white",
                }}
                _hover={{
                  backgroundColor: "rgba(61, 136, 248, 0.8)",
                  color: "white",
                }}
              /> */}
            </MenuList>
          </Menu>
        ),
      };
      dataArray.push(details);
    });
    return dataArray;
  }, [chainId, result, tokenData, router]);

  const columns = useMemo(
    () => [
      {
        Header: "Date Created",
        accessor: "createdAt",
      },
      {
        Header: "Invoice Name/ID",
        accessor: "projectName",
      },
      {
        Header: "Amount",
        accessor: "amount",
        isnumeric: "true",
      },
      {
        Header: "Currency",
        accessor: "currency",
        isnumeric: "true",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      // {
      //   Header: "Action",
      //   accessor: "action",
      // },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    // @ts-ignore
    page,
    // @ts-ignore
    canPreviousPage,
    // @ts-ignore
    canNextPage,
    // @ts-ignore
    pageOptions,
    // @ts-ignore
    pageCount,
    // @ts-ignore
    gotoPage,
    // @ts-ignore
    nextPage,
    // @ts-ignore
    previousPage,
    state: {
      // @ts-ignore
      pageIndex,
      // @ts-ignore
      pageSize,
    },
  } = useTable(
    {
      // @ts-ignore
      columns,
      data,
      // initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );

  // cell props and getCellProps for individual cell control styling
  return (
    <Styles>
      <HStack justify="space-between" align="center" mb={8}>
        <Heading textAlign="left" color="#192A3E">
          My Invoices
        </Heading>
        <Button
          backgroundColor="blue.1"
          _hover={{ backgroundColor: "rgba(61, 136, 248, 0.7)" }}
          _active={{ backgroundColor: "rgba(61, 136, 248, 0.7)" }}
          color="white"
          onClick={() => router.push("/create")}
        >
          Create Invoice
        </Button>
      </HStack>
      <div className="tableWrap">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup, hg) => (
              // eslint-disable-next-line react/jsx-key
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, i) => (
                  // eslint-disable-next-line react/jsx-key
                  <th {...column.getHeaderProps()}>
                    <Text
                      textColor={
                        // @ts-ignore
                        column.isSorted ? "black" : "blue.dark"
                      }
                    >
                      {column.render("Header")}
                      {i !== headerGroup.headers.length - 1 && (
                        <chakra.span pl="4">
                          <FilterIcon width="8px" height="8px" />
                        </chakra.span>
                      )}
                    </Text>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {
              // @ts-ignore
              page.map((row, i) => {
                prepareRow(row);
                return (
                  // eslint-disable-next-line react/jsx-key
                  <tr {...row.getRowProps()}>
                    {
                      // @ts-ignore
                      row.cells.map((cell, index) => {
                        return (
                          // eslint-disable-next-line react/jsx-key
                          <td
                            // Change cell formatting here most likely through targeting getCellProps with a function
                            // docs for react-table
                            {...cell.getCellProps({
                              className: cell.column.collapse ? "collapse" : "",
                            })}
                            className={
                              cell.column.id === "amount"
                                ? "noAmount"
                                : cell.column.id === "currency"
                                ? "noCurrency"
                                : cell.column.id === "createdAt"
                                ? "noDate"
                                : null
                            }
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })
                    }
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <IconButton
          aria-label="Previous Page"
          icon={<LeftArrowIcon />}
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        />
        <span>
          Page {pageIndex + 1} of {pageCount}
        </span>
        <IconButton
          aria-label="Next Page"
          icon={<RightArrowIcon />}
          onClick={() => nextPage()}
          disabled={!canNextPage}
        />
      </div>
    </Styles>
  );
};
