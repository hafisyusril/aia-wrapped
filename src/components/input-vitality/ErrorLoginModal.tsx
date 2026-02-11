import { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ErrorLoginModalProps = {
  show: boolean;
  onClose: () => void;
};
const ErrorLoginModal: FC<ErrorLoginModalProps> = ({ show, onClose }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-10 bg-black/10 flex items-center justify-center p-5"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            className="relative flex flex-col gap-7 w-84 max-w-full px-8 py-5 rounded-3xl bg-white shadow-md text-center"
          >
            <div className="flex flex-col items-center">
              <svg width="43" height="43" viewBox="0 0 43 43" fill="none">
                <path
                  d="M36.0746 6.1895C27.822 -2.06317 14.4422 -2.06317 6.1895 6.1895C-2.06317 14.4422 -2.06317 27.822 6.1895 36.0746C14.4422 44.3273 27.822 44.3273 36.0746 36.0746C44.3273 27.822 44.3273 14.4422 36.0746 6.1895ZM27 30.5382L21.1344 25.0726L15.2688 30.9382C14.1821 32.0249 12.4173 32.0249 11.3259 30.9382C10.2346 29.8515 10.2392 28.0867 11.3259 26.9953L17.1915 21.1297L11.3259 15.2642C10.2392 14.1774 10.2392 12.4127 11.3259 11.3213C12.4127 10.2299 14.1774 10.2346 15.2688 11.3213L21.1344 17.1869L27 11.3213C28.0867 10.2346 29.8515 10.2346 30.9429 11.3213C32.0342 12.408 32.0296 14.1728 30.9429 15.2642L25.0773 21.1297L30.9429 26.9953C32.0296 28.082 32.0296 29.8468 30.9429 30.9382C29.8561 32.0296 28.0913 32.0249 27 30.9382Z"
                  fill="#E11F46"
                />
              </svg>
              <div className="mt-2.5 font-bold">Login Failed</div>
            </div>
            <div className="font-medium">
              Please ensure that you enter your{" "}
              <span className="text-[#EA0F4A]">AIA Vitality</span> membership
              number correctly.
            </div>
            <div className="text-sm">
              As shown in the information under the “Profile” menu, for example:
              VI00001111
            </div>
            <div className="text-xs">
              For more information contact us via email:
              <br />
              To:{" "}
              <a className="text-[#EA0F4A]" href="mailto:id.customer@aia.com">
                id.customer@aia.com
              </a>
              <br />
              Cc:{" "}
              <a
                className="text-[#EA0F4A]"
                href="mailto:idvitality.support@aia.com"
              >
                idvitality.support@aia.com
              </a>
              <br />
            </div>
            <button
              className="block w-full h-11.5 font-semibold bg-[#F8114F] text-white rounded-lg"
              onClick={onClose}
            >
              OK
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorLoginModal;
