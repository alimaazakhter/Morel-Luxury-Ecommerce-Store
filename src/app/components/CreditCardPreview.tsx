import { motion } from "motion/react";
import { CreditCard, ShieldCheck } from "lucide-react";

interface CreditCardPreviewProps {
  card: string;
  name: string;
  expiry: string;
  cvv: string;
  isFlipped: boolean;
}

export function CreditCardPreview({
  card,
  name,
  expiry,
  cvv,
  isFlipped,
}: CreditCardPreviewProps) {
  const formattedCard = card.padEnd(16, "•").replace(/(.{4})/g, "$1 ").trim();

  return (
    <div className="w-full max-w-sm mx-auto h-48 perspective-1000 mb-6">
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="w-full h-full relative transform-style-3d shadow-xl rounded-xl"
      >
        {/* Front of Card */}
        <div className="absolute inset-0 w-full h-full rounded-xl bg-gradient-to-tr from-stone-900 via-stone-800 to-amber-900 text-white p-5 flex flex-col justify-between backface-hidden border border-amber-500/20 shadow-lg">
          <div className="flex justify-between items-center">
            <div className="w-10 h-7 rounded bg-amber-400/80 flex items-center justify-center border border-amber-200/40">
              <div className="w-7 h-4 border-t border-b border-amber-800/40" />
            </div>
            <CreditCard size={24} className="text-amber-400/70" />
          </div>

          <div className="font-mono text-lg tracking-widest text-stone-100 my-2">
            {formattedCard}
          </div>

          <div className="flex justify-between items-end text-xs uppercase tracking-wider">
            <div>
              <p className="text-[9px] text-stone-400 mb-0.5">Card Holder</p>
              <p className="font-medium truncate max-w-[180px]">
                {name || "SARAH CHEN"}
              </p>
            </div>
            <div>
              <p className="text-[9px] text-stone-400 mb-0.5">Expires</p>
              <p className="font-mono font-medium">{expiry || "09/28"}</p>
            </div>
          </div>
        </div>

        {/* Back of Card */}
        <div className="absolute inset-0 w-full h-full rounded-xl bg-stone-900 text-white p-5 flex flex-col justify-between backface-hidden rotate-y-180 border border-stone-700 shadow-lg">
          <div className="w-[108%] -mx-5 h-10 bg-stone-950 mt-2" />
          <div className="bg-stone-800 rounded p-2 text-right">
            <p className="text-[9px] text-stone-400 uppercase tracking-widest mb-1">
              CVV / CVC
            </p>
            <p className="font-mono text-sm tracking-widest font-bold text-amber-400">
              {cvv || "•••"}
            </p>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-stone-400 justify-end">
            <ShieldCheck size={12} /> Encrypted & Secure
          </div>
        </div>
      </motion.div>
    </div>
  );
}
