import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
} from '@chakra-ui/react';
import React from 'react';
import { ChainId, getNetworkName } from '../utils';

export type NetworkChangeAlertModalProps = {
  showChainChangeAlert: boolean;
  setShowChainChangeAlert: (show: boolean) => void;
  chainId?: ChainId;
};

export const NetworkChangeAlertModal: React.FC<
  NetworkChangeAlertModalProps
> = ({ showChainChangeAlert, setShowChainChangeAlert, chainId }) => (
  <Modal
    isOpen={showChainChangeAlert}
    onClose={() => setShowChainChangeAlert(false)}
  >
    <ModalOverlay />
    <ModalContent>
      <ModalHeader style={{ textAlign: 'center', color: 'red' }}>
        Attention
      </ModalHeader>
      <ModalBody
        style={{
          backgroundColor: '#ffebee',
          borderRadius: '5px',
          color: 'red',
          margin: '5px',
        }}
      >
        <div>
          {chainId ? (
            <>
              You are changing the network to <b>{getNetworkName(chainId)}</b>.
            </>
          ) : (
            'Disconnected.'
          )}
        </div>
        <hr style={{ borderTop: '1px solid red', margin: '10px 0' }} />
        <div>
          You must complete all invoice creation steps on the same chain.
          <br />
          If you have not yet input any information, you can continue.
          <br />
          Otherwise, please return to Step 1 and complete all steps on the same
          network.
        </div>
      </ModalBody>
      <ModalCloseButton color="gray.400" />
    </ModalContent>
  </Modal>
);
