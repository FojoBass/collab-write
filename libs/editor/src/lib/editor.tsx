import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { EditorProvider, useCurrentEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { FaEdit, FaSave } from 'react-icons/fa';
import MenuBar from './MenuBar';
import { useEffect, useMemo, useState } from 'react';
import { DocumentInt, updateDocReq } from '@collab-write/firebase';
import { useGlobalContext } from './context.api';

enum ReqStatusEnum {
  req = 'requested',
  gran = 'granted',
}

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle,
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
  Underline,
];

const Editor = () => {
  const {
    doc,
    docId,
    isUser,
    isErr,
    isSuccess,
    setIsErr,
    setIsSuccess,
    disableSave,
    setDisableSave,
  } = useGlobalContext();
  const [htmlContent, setHtmlContent] = useState('');
  const collabUserId = useMemo(() => {
    const storeCoId = sessionStorage.getItem('collab-write-co-id');
    if (!isUser && storeCoId) return JSON.parse(storeCoId).uid;
    return '';
  }, [isUser]);
  // const [disableSave, setDisableSave] = useState(false);
  const [requestStatus, setRequestStatus] = useState<ReqStatusEnum | ''>('');
  const [disableReq, setDisableReq] = useState(false);

  const handleReqClick = async () => {
    if (doc && collabUserId) {
      const collborators = doc.collborators.map((user) => {
        return user.uid === collabUserId
          ? { ...user, isRequest: !user.isRequest }
          : user;
      });
      const data: Partial<DocumentInt> = { collborators, id: doc.id };
      try {
        setDisableReq(true);
        await updateDocReq(data);
      } catch (err) {
        setIsErr && setIsErr(true);
      } finally {
        setDisableReq(false);
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsErr && setIsErr(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [isErr]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSuccess && setIsSuccess(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [isSuccess]);

  useEffect(() => {
    setDisableSave && setDisableSave(!isUser);
  }, [isUser]);

  useEffect(() => {
    if (doc && collabUserId) {
      const collabs = doc.collborators;
      if (collabs.find((user) => user.uid === collabUserId)?.isGranted) {
        setDisableSave && setDisableSave(false);
        setRequestStatus(ReqStatusEnum.gran);
      } else if (collabs.find((user) => user.uid === collabUserId)?.isRequest) {
        setDisableSave && setDisableSave(true);
        setRequestStatus(ReqStatusEnum.req);
      } else {
        setDisableSave && setDisableSave(true);
        setRequestStatus('');
      }
    }
  }, [doc, collabUserId]);

  return (
    <div className="center_sect">
      {!doc ? (
        <div className="editor mt-8 max-w-[650px] mx-auto border border-clr-brd py-3 rounded-md bg-slate-200 h-36 animate-pulse"></div>
      ) : (
        <div className="editor mt-8 max-w-[650px] mx-auto border border-clr-brd py-3 rounded-md bg-sub-warm">
          <EditorProvider
            slotBefore={<MenuBar />}
            extensions={extensions}
            content={doc.content}
            onUpdate={({ editor }) => {
              const html = editor.getHTML();
              setHtmlContent(html);
            }}
            slotAfter={
              <SaveBtn
                htmlContent={htmlContent}
                docId={docId ?? ''}
                disableSave={disableSave ?? false}
              />
            }
            key={doc.id}
          ></EditorProvider>

          {isErr && <p className="text-center text-red-500 text-sm">Failed</p>}
          {isSuccess && (
            <p className="text-center text-green-500 text-sm">Success</p>
          )}
          {!isUser && (
            <button
              className={`req_btn ${requestStatus}`}
              title={`${
                requestStatus === ReqStatusEnum.req
                  ? 'Requested for Edit'
                  : requestStatus === ReqStatusEnum.gran
                  ? 'Granted Edit'
                  : 'Request for Edit'
              }`}
              onClick={handleReqClick}
              disabled={disableReq || requestStatus === ReqStatusEnum.gran}
            >
              <FaEdit />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const SaveBtn = ({
  htmlContent,
  docId,
  disableSave,
}: {
  htmlContent: string;
  docId: string;
  disableSave: boolean;
}) => {
  const [loading, setLoading] = useState(false);
  const { setIsErr, setIsSuccess } = useGlobalContext();

  const handleSave = async () => {
    const data = { content: htmlContent, id: docId };

    try {
      await updateDocReq(data);
      setIsSuccess && setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setIsErr && setIsErr(true);
    } finally {
    }
  };

  return (
    <button
      className="cta_btn ml-4 mt-5"
      onClick={handleSave}
      disabled={loading || disableSave}
    >
      <FaSave />
    </button>
  );
};

export default Editor;
