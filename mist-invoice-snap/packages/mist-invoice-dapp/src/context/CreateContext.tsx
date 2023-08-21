import { AbiCoder, encodeBytes32String, TransactionResponse } from 'ethers';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  getResolvers,
  getWrappedNativeToken,
  // getInvoiceFactoryAddress,
  isValidLink,
  logError,
} from '../utils/helpers';
import { register } from '../utils/invoice';
// import { uploadMetadata } from "../utils";
import { Web3Context } from './Web3Context';

import { INSTANT_STEPS, ESCROW_STEPS } from '../utils/constants';

import { INVOICE_TYPES } from '../utils/constants';
import { useCreateInstant } from './create-hooks/useCreateInstant';
import { useCreateEscrow } from './create-hooks/useCreateEscrow';
import {
  MistInvoiceEscrowWrapper,
  MistInvoiceEscrowWrapper__factory,
} from '@/types';
import { uploadMetadata } from '@/utils';
import { MistContext } from './MistContext';

export type ProjectAgreement = {
  type: string;
  src: string;
  createdAt: string;
};

export type CreateContextType = {
  projectName?: string;
  projectDescription?: string;
  projectAgreement?: ProjectAgreement[];
  projectAgreementSource?: string;
  projectAgreementLinkType?: string;
  startDate?: number;
  endDate?: number;
  safetyValveDate?: number;
  clientAddress?: string;
  paymentAddress?: string;
  paymentDue?: bigint;
  paymentToken?: string;
  milestones?: string;
  termsAccepted?: boolean;
  arbitrationProvider?: string;
  payments?: bigint[];
  invoiceType?: string;
  deadline?: number;
  lateFee?: bigint;
  lateFeeInterval?: number;
  tx?: TransactionResponse;
  loading: boolean;
  currentStep: number;
  nextStepEnabled: boolean;
  goBackHandler: () => void;
  nextStepHandler: () => void;
  setProjectName: (projectName: string) => void;
  setProjectDescription: (projectDescription: string) => void;
  setProjectAgreement: (projectAgreement: ProjectAgreement[]) => void;
  setProjectAgreementSource: (projectAgreementSource: string) => void;
  setProjectAgreementLinkType: (projectAgreementLinkType: string) => void;
  setStartDate: (startDate: number) => void;
  setEndDate: (endDate: number) => void;
  setSafetyValveDate: (safetyValveDate: number) => void;
  setClientAddress: (clientAddress: string) => void;
  setPaymentAddress: (paymentAddress: string) => void;
  setPaymentDue: (paymentDue: bigint) => void;
  setPaymentToken: (paymentToken: string) => void;
  setMilestones: (milestones: string) => void;
  setTermsAccepted: (termsAccepted: boolean) => void;
  setArbitrationProvider: (arbitrationProvider: string) => void;
  setPayments: (payments: bigint[]) => void;
  setInvoiceType: (invoiceType: string) => void;
  setDeadline: (deadline: number) => void;
  setLateFee: (lateFee: bigint) => void;
  setLateFeeInterval: (lateFeeInterval: number) => void;
  createInvoice: () => Promise<void>;
};

export const CreateContext = createContext<CreateContextType>({
  loading: true,
  currentStep: -1,
  nextStepEnabled: false,
  goBackHandler: () => {},
  nextStepHandler: () => {},
  setProjectName: () => {},
  setProjectDescription: () => {},
  setProjectAgreement: () => {},
  setProjectAgreementSource: () => {},
  setProjectAgreementLinkType: () => {},
  setStartDate: () => {},
  setEndDate: () => {},
  setSafetyValveDate: () => {},
  setClientAddress: () => {},
  setPaymentAddress: () => {},
  setPaymentDue: () => {},
  setPaymentToken: () => {},
  setMilestones: () => {},
  setTermsAccepted: () => {},
  setArbitrationProvider: () => {},
  setPayments: () => {},
  setDeadline: () => {},
  setInvoiceType: () => {},
  setLateFee: () => {},
  setLateFeeInterval: () => {},
  createInvoice: async () => {},
});

export const CreateContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { provider: rpcProvider, chainId } = useContext(Web3Context);
  const { data: mistData, secret: mistSecret } = useContext(MistContext);

  const [wrappedNativeToken, setWrappedNativeToken] = useState('');

  // project details
  const [invoiceType, setInvoiceType] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectAgreementLinkType, setProjectAgreementLinkType] =
    useState('https');
  const [projectAgreementSource, setProjectAgreementSource] = useState('');
  const [projectAgreement, setProjectAgreement] = useState<ProjectAgreement[]>([
    {
      type: projectAgreementLinkType,
      src: projectAgreementSource,
      createdAt: Date.now().toString(),
    },
  ]);
  const [startDate, setStartDate] = useState<number>();
  const [endDate, setEndDate] = useState<number>();
  const [detailsHash, setDetailsHash] = useState(''); // ipfsHash for projectDetails

  // payment details
  const [clientAddress, setClientAddress] = useState('');
  const [paymentAddress, setPaymentAddress] = useState('');
  const [paymentDue, setPaymentDue] = useState(BigInt(0));
  const [paymentToken, setPaymentToken] = useState('');
  const [milestones, setMilestones] = useState('1');

  // escrow details
  const [safetyValveDate, setSafetyValveDate] = useState(0);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [arbitrationProvider, setArbitrationProvider] = useState('');
  const [requireVerification, setRequireVerification] = useState(true);

  // instant payment details
  const [deadline, setDeadline] = useState(0);
  const [lateFee, setLateFee] = useState(BigInt(0));
  const [lateFeeInterval, setLateFeeInterval] = useState(0);

  // payments chunks
  const [payments, setPayments] = useState([BigInt(0)]);
  const [tx, setTx] = useState<TransactionResponse>();
  const [loading, setLoading] = useState(false);

  // step handling
  const [currentStep, setStep] = useState(1);
  const [nextStepEnabled, setNextStepEnabled] = useState(false);
  const [allValid, setAllValid] = useState(false);

  useEffect(() => {
    if (!chainId) return;
    const resolvers = getResolvers(chainId);
    if (resolvers?.length > 0) setArbitrationProvider(resolvers[0]);
    const wrapNatToken = getWrappedNativeToken(chainId);
    setWrappedNativeToken(wrapNatToken);
    setPaymentToken(wrapNatToken);
  }, [chainId]);

  const { Escrow, Instant } = INVOICE_TYPES;

  // common for all invoice types
  const step1Valid = useMemo(() => {
    if (invoiceType === Escrow) {
      return (
        projectName !== undefined &&
        isValidLink(projectAgreementSource) &&
        safetyValveDate !== undefined &&
        safetyValveDate > new Date().getTime()
      );
    } else if (invoiceType === Instant) {
      return projectName !== undefined && isValidLink(projectAgreementSource);
    }
    return false;
  }, [
    projectName,
    projectAgreementSource,
    safetyValveDate,
    Escrow,
    Instant,
    invoiceType,
  ]);

  // handle invoice type
  const { escrowStep2Valid, escrowStep3Valid } = useCreateEscrow({
    step1Valid,
    allValid,
    clientAddress,
    paymentAddress,
    payments,
    paymentToken,
    paymentDue,
    milestones,
    termsAccepted,
    arbitrationProvider,
    setAllValid,
  });

  const { instantStep2Valid } = useCreateInstant({
    step1Valid,
    allValid,
    clientAddress,
    paymentAddress,
    paymentToken,
    paymentDue,
    milestones,
    setAllValid,
  });

  useEffect(() => {
    setProjectAgreement([
      {
        type: projectAgreementLinkType,
        src: projectAgreementSource,
        createdAt: Date.now().toString(),
      },
    ]);
  }, [projectAgreementSource, projectAgreementLinkType]);

  useEffect(() => {
    if (step1Valid && currentStep === 2) {
      uploadMetadata({
        projectName,
        projectDescription,
        projectAgreement,
        startDate: startDate ? Math.floor(startDate / 1000) : undefined,
        endDate: endDate ? Math.floor(endDate / 1000) : undefined,
      })
        .then(
          (hash) => setDetailsHash(hash),
          (ipfsError) => {
            logError({ ipfsError });
            setDetailsHash(
              '0xed70cef5a086e264386ab026edaaabb8f25c378f1e3a699a2c0a72a20d53c7fb',
            );
          },
        )
        .then(() => {
          console.log('uploadedMetadata', detailsHash);
        });
    }
  }, [
    step1Valid,
    currentStep,
    projectName,
    projectDescription,
    projectAgreement,
    projectAgreementLinkType,
    projectAgreementSource,
    startDate,
    endDate,
  ]);

  const encodeEscrowData = useCallback(
    (factoryAddress: string) => {
      const resolverType = 0; // 0 for individual, 1 for erc-792 arbitrator
      const type = encodeBytes32String(Escrow);

      const data = AbiCoder.defaultAbiCoder().encode(
        [
          'address',
          'uint8',
          'address',
          'address',
          'uint256',
          'bytes32',
          'address',
          'bool',
          'address',
        ],
        [
          clientAddress,
          resolverType,
          arbitrationProvider,
          paymentToken,
          Math.floor(safetyValveDate / 1000),
          detailsHash,
          wrappedNativeToken,
          requireVerification,
          factoryAddress,
        ],
      );

      return { type, data };
    },
    [
      clientAddress,
      arbitrationProvider,
      paymentToken,
      safetyValveDate,
      detailsHash,
      wrappedNativeToken,
      requireVerification,
      Escrow,
    ],
  );

  const encodeInstantData = useCallback(() => {
    const type = encodeBytes32String(Instant);
    const data = AbiCoder.prototype.encode(
      [
        'address',
        'address',
        'uint256',
        'bytes32',
        'address',
        'uint256',
        'uint256',
      ],
      [
        clientAddress,
        paymentToken,
        Math.floor(deadline / 1000),
        detailsHash,
        wrappedNativeToken,
        lateFee,
        lateFeeInterval,
      ],
    );

    return { type, data };
  }, [
    clientAddress,
    paymentToken,
    deadline,
    detailsHash,
    wrappedNativeToken,
    lateFee,
    lateFeeInterval,
    Instant,
  ]);

  const createInvoice = useCallback(async () => {
    let type;
    let data;

    console.log('createInvoice', chainId, allValid, detailsHash, mistSecret);

    if (
      chainId &&
      rpcProvider &&
      allValid &&
      detailsHash &&
      mistData?.merkleRoot &&
      mistData?.clientRandom &&
      mistData?.providerRandom &&
      mistData?.clientKey &&
      mistData?.providerKey &&
      mistSecret?.encData
    ) {
      setLoading(true);
      setTx(undefined);

      // const factoryAddress = getInvoiceFactoryAddress(chainId);
      const escrowWrapperAddress =
        process.env.NEXT_PUBLIC_MIST_INVOICE_ESCROW_WRAPPER;

      let paymentAmounts = [BigInt(0)];
      if (escrowWrapperAddress && invoiceType === Escrow) {
        const escrowInfo = encodeEscrowData(escrowWrapperAddress);
        type = escrowInfo.type;
        data = escrowInfo.data;
        paymentAmounts = payments;
        const wrapper =
          MistInvoiceEscrowWrapper__factory.connect(escrowWrapperAddress);
        const connected = wrapper.connect(await rpcProvider.getSigner());
        const txResult = await connected.createInvoice(
          {
            merkleRoot: mistData.merkleRoot,
            clientRandom: mistData.clientRandom,
            providerRandom: mistData.providerRandom,
            clientKey: mistData.clientKey,
            providerKey: mistData.providerKey,
          },
          paymentAmounts,
          data,
          type,
        );

        console.log('txResult', txResult);

        setTx(txResult);
      } else if (invoiceType === Instant) {
        // const instantInfo = encodeInstantData();
        // type = instantInfo.type;
        // data = instantInfo.data;
        // paymentAmounts = [paymentDue];
      }

      setLoading(false);
    }
  }, [
    chainId,
    rpcProvider,
    // clientAddress,
    paymentAddress,
    // arbitrationProvider,
    // paymentToken,
    payments,
    // safetyValveDate,
    // deadline,
    // lateFee,
    // lateFeeInterval,
    detailsHash,
    // requireVerification,
    // step1Valid,
    // escrowStep2Valid,
    // instantStep2Valid,
    // escrowStep3Valid,
    allValid,
    invoiceType,
    Escrow,
    Instant,
    encodeEscrowData,
    encodeInstantData,
    paymentDue,
  ]);

  useEffect(() => {
    if (invoiceType === Escrow) {
      if (currentStep === 1) {
        setNextStepEnabled(step1Valid);
      } else if (currentStep === 2) {
        setNextStepEnabled(escrowStep2Valid);
      } else if (currentStep === 3) {
        setNextStepEnabled(escrowStep3Valid);
      } else if (currentStep === 4) {
        setNextStepEnabled(true);
      } else {
        setNextStepEnabled(false);
      }
    }

    if (invoiceType === Instant) {
      if (currentStep === 1) {
        setNextStepEnabled(step1Valid);
      } else if (currentStep === 2) {
        setNextStepEnabled(instantStep2Valid);
      } else if (currentStep === 3) {
        setNextStepEnabled(true);
      }
    }
  }, [
    step1Valid,
    escrowStep2Valid,
    escrowStep3Valid,
    instantStep2Valid,
    currentStep,
    invoiceType,
    Escrow,
    Instant,
  ]);

  const goBackHandler = () => setStep((prevState: number) => prevState - 1);

  const nextStepHandler = useCallback(() => {
    let maxStep;
    switch (invoiceType) {
      case Escrow:
        maxStep = Object.keys(ESCROW_STEPS).length;
        break;
      case Instant:
        maxStep = Object.keys(INSTANT_STEPS).length;
        break;
      default:
        maxStep = 0;
    }
    if (nextStepEnabled) {
      if (currentStep === maxStep) return createInvoice();
      setStep((prevState: number) => prevState + 1);
    }
    return () => undefined;
  }, [
    nextStepEnabled,
    currentStep,
    invoiceType,
    createInvoice,
    Escrow,
    Instant,
  ]);

  return (
    <CreateContext.Provider
      value={{
        projectName,
        projectDescription,
        projectAgreement,
        projectAgreementSource,
        projectAgreementLinkType,
        startDate,
        endDate,
        safetyValveDate,
        clientAddress,
        paymentAddress,
        paymentDue,
        paymentToken,
        milestones,
        termsAccepted,
        arbitrationProvider,
        payments,
        tx,
        invoiceType,
        deadline,
        lateFee,
        lateFeeInterval,
        // setters
        setProjectName,
        setProjectDescription,
        setProjectAgreement,
        setProjectAgreementSource,
        setProjectAgreementLinkType,
        setStartDate,
        setEndDate,
        setSafetyValveDate,
        setClientAddress,
        setPaymentAddress,
        setPaymentDue,
        setPaymentToken,
        setMilestones,
        setTermsAccepted,
        setArbitrationProvider,
        setPayments,
        setInvoiceType,
        setDeadline,
        setLateFee,
        setLateFeeInterval,
        // creating invoice
        loading,
        createInvoice,
        // stepHandling
        currentStep,
        nextStepEnabled,
        goBackHandler,
        nextStepHandler,
      }}
    >
      {children}
    </CreateContext.Provider>
  );
};
