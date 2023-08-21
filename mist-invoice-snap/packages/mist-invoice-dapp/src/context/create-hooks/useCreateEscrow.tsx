import { useMemo, useEffect } from "react";
import { isAddress } from "@ethersproject/address";
import { BigNumberish } from "ethers";

export function useCreateEscrow({
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
}: {
  step1Valid: boolean;
  allValid: boolean;
  clientAddress: string;
  paymentAddress: string;
  payments: BigNumberish[];
  paymentToken: string;
  paymentDue: BigNumberish;
  milestones: number;
  termsAccepted: boolean;
  arbitrationProvider: string;
  setAllValid: (allValid: boolean) => void;
}) {
  const escrowStep2Valid = useMemo(
    () =>
      isAddress(clientAddress) &&
      isAddress(paymentAddress) &&
      isAddress(paymentToken) &&
      isAddress(arbitrationProvider) &&
      BigInt(paymentDue) > 0 &&
      !isNaN(Number(milestones)) &&
      milestones > 0 &&
      termsAccepted &&
      Array.from(
        new Set([
          clientAddress.toLowerCase(),
          paymentAddress.toLowerCase(),
          paymentToken.toLowerCase(),
          arbitrationProvider.toLowerCase(),
        ])
      ).length === 4,
    [
      clientAddress,
      paymentAddress,
      paymentToken,
      arbitrationProvider,
      paymentDue,
      milestones,
      termsAccepted,
    ]
  );

  const escrowStep3Valid = useMemo(
    () => payments.reduce((t, a) => BigInt(t) + BigInt(a), BigInt(0)) === paymentDue,
    [payments, paymentDue]
  );

  useEffect(() => {
    if (step1Valid && escrowStep2Valid && escrowStep3Valid) {
      setAllValid(true);
    }
  }, [step1Valid, escrowStep2Valid, escrowStep3Valid, allValid, setAllValid]);

  return { escrowStep2Valid, escrowStep3Valid };
}
