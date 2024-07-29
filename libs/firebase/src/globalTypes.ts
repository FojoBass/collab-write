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
}

export { GlobalState, UserInfoInt, DocumentInt };
