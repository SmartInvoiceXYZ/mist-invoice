import { Contract, Interface, Provider } from "ethers";

export const balanceOf = async (
  ethersProvider: Provider,
  token: string,
  address: string
) => {
  const abi = new Interface([
    "function balanceOf(address account) view returns(uint256)",
  ]);
  const contract = new Contract(token, abi, ethersProvider);
  return contract.balanceOf(address);
};
