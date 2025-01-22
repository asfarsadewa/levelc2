'use client'

import { useState } from "react";
import { correctGrammar } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from 'react-markdown';
import { X, Copy, Check } from "lucide-react";

export default function Home() {
  const [input, setInput] = useState('');
  const [corrected, setCorrected] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    try {
      const result = await correctGrammar(input);
      setCorrected(result);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setInput('');
    setCorrected('');
  };

  const handleCopy = async () => {
    const plainText = corrected.replace(/[*_]/g, '');
    await navigator.clipboard.writeText(plainText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <main className="max-w-2xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-2"
        >
          <h1 className="text-4xl font-bold tracking-tight">Level C2</h1>
          <p className="text-muted-foreground">
            Menuju Puncak Kemahiran Bahasa Inggris Level C2 Supaya Dapat Menggosip Artis
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Murid</CardTitle>
              <CardDescription>
                Masukkan teks yang ingin kamu perbaiki
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Textarea
                    placeholder="Masukkan teks yang ingin Anda perbaiki..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="min-h-[120px] resize-none pr-8"
                  />
                  {input && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6 rounded-full opacity-70 hover:opacity-100 transition-opacity"
                      onClick={handleClear}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Clear input</span>
                    </Button>
                  )}
                </div>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading || !input.trim()}
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"
                      />
                      Memproses...
                    </>
                  ) : (
                    'Perbaiki Teks'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <AnimatePresence>
          {corrected && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="relative"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-sky-500/10 rounded-lg blur-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
              <Card className="relative backdrop-blur-sm border-foreground/10">
                <CardHeader className="flex flex-row items-center justify-between space-x-2">
                  <CardTitle className="text-lg">Saran dari Pak Guru Level C4</CardTitle>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-muted/50 transition-colors"
                    onClick={handleCopy}
                  >
                    {copied ? (
                      <motion.div
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <Check className="h-4 w-4 text-emerald-500" />
                      </motion.div>
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    <span className="sr-only">Copy corrected text</span>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown
                      components={{
                        strong: ({ children }) => (
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                            {children}
                          </span>
                        ),
                        em: ({ children }) => (
                          <span className="italic text-sky-600 dark:text-sky-400">
                            {children}
                          </span>
                        ),
                      }}
                    >
                      {corrected}
                    </ReactMarkdown>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
