import { FieldValue } from 'firebase/firestore';

interface GlobalState {
  id: string;
}

interface UserInfoInt {
  uid: string;
  name: string;
}

interface DocumentInt {
  id: string;
  uid: string;
  title: string;
  createdAt: FieldValue | string;
  updateAt: FieldValue | string;
  content: string;
  collborators: CollaboInt[];
}

interface FormErrorInt {
  targetId: string;
  msg: string;
}

interface CollaboInt {
  name: string;
  uid: string;
  isRequest: boolean;
  isGranted: boolean;
}

export { GlobalState, UserInfoInt, DocumentInt, FormErrorInt, CollaboInt };
