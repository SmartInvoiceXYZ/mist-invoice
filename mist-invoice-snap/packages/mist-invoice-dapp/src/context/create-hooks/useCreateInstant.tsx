import { useMemo, useEffect } from "react";
import { isAddress } from "@ethersproject/address";
import { BigNumberish } from "ethers";

export function useCreateInstant({
  step1Valid,
  allValid,
  clientAddress,
  paymentAddress,
  paymentToken,
  paymentDue,
  milestones,
  setAllValid,
}: {
  step1Valid: boolean;
  allValid: boolean;
  clientAddress: string;
  paymentAddress: string;
  paymentToken: string;
  paymentDue: BigNumberish;
  milestones: number;
  setAllValid: (allValid: boolean) => void;
}) {
  const instantStep2Valid = useMemo(
    () =>
      isAddress(clientAddress) &&
      isAddress(paymentAddress) &&
      isAddress(paymentToken) &&
      paymentDue.gt(0) &&
      !isNaN(Number(milestones)) &&
      milestones > 0 &&
      Array.from(
        new Set([
          clientAddress.toLowerCase(),
          paymentAddress.toLowerCase(),
          paymentToken.toLowerCase(),
        ])
      ).length === 3,
    [clientAddress, paymentAddress, paymentToken, paymentDue, milestones]
  );

  useEffect(() => {
    if (step1Valid && instantStep2Valid) {
      setAllValid(true);
    }
  }, [step1Valid, instantStep2Valid, allValid, setAllValid]);

  return { instantStep2Valid };
}
