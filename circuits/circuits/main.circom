pragma circom 2.1.2;

include "./templates/invoice_membership.circom";

component main { public [ root, Tx, Ty, Ux, Uy, signalHash ] } = InvoiceMembership(2);