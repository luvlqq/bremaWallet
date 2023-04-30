import { UserTransfer } from '@prisma/client';

export class HistoryTransactionDTO {
  sentTransfers: Omit<UserTransfer, 'sender' | 'senderLogin'>[];
  receivedTransfers: Omit<UserTransfer, 'recipient' | 'recipientLogin'>[];
}
