"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FormInput } from "@/components/ui/FormInput";

interface CreatePostFormData {
  title: string;
  summary: string;
  content: string;
}

export function CreatePostForm(): React.JSX.Element {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState<CreatePostFormData>({
    title: "",
    summary: "",
    content: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect if not authenticated
  if (status === "loading") {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-2 text-gray-600">Kontrollerar inloggning...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 mb-4">Du måste vara inloggad för att skapa inlägg</p>
        <Link
          href="/auth/signin"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Logga in
        </Link>
      </div>
    );
  }

  const handleInputChange = (field: keyof CreatePostFormData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(null);
  };



  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      setError("Titel och innehåll är obligatoriska");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title.trim(),
          summary: formData.summary.trim(),
          content: formData.content.trim()
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ett fel uppstod');
      }

      // Omdirigera till startsidan efter framgångsrik skapelse
      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ett fel uppstod när inlägget skulle skapas. Försök igen.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = (): boolean => {
    return !!(formData.title.trim() && formData.content.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {error && (
          <div 
            className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg"
            role="alert"
            aria-live="polite"
          >
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">{error}</span>
            </div>
          </div>
        )}

        <FormInput
          id="title"
          label="Titel"
          type="text"
          value={formData.title}
          onChange={handleInputChange('title')}
          required
          placeholder="Skriv en beskrivande titel för ditt inlägg"
          autoComplete="off"
          disabled={isSubmitting}
        />

                 <div className="space-y-3">
           <label 
             htmlFor="summary"
             className="block text-base font-semibold text-gray-900"
           >
             Sammanfattning (valfritt)
           </label>
                      <textarea
              id="summary"
              value={formData.summary}
              onChange={(e) => handleInputChange('summary')(e.target.value)}
              disabled={isSubmitting}
              placeholder="Skriv en kort sammanfattning av din idé (max 150 tecken)..."
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed text-gray-900 placeholder-gray-500"
              rows={3}
              maxLength={150}
              aria-describedby="summary-help"
            />
          <div className="flex justify-between items-center">
            <p id="summary-help" className="text-sm text-gray-600">
              En kort beskrivning som hjälper andra förstå ditt inlägg
            </p>
            <span className="text-sm text-gray-500">
              {formData.summary.length}/150
            </span>
          </div>
        </div>

                 <div className="space-y-3">
           <label 
             htmlFor="content"
             className="block text-base font-semibold text-gray-900"
           >
             Innehåll
             <span className="text-red-600 ml-1" aria-label="obligatoriskt">*</span>
           </label>
                      <textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleInputChange('content')(e.target.value)}
              required
              disabled={isSubmitting}
              placeholder="Skriv ditt inlägg här..."
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed text-gray-900 placeholder-gray-500"
              rows={10}
              aria-describedby="content-help"
            />
          <p id="content-help" className="text-sm text-gray-600">
            Dela dina tankar, idéer eller frågor med samhället
          </p>
        </div>



        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <Link
            href="/"
            className="px-6 py-3 text-gray-700 hover:text-gray-900 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-opacity-50 font-medium"
          >
            ← Avbryt
          </Link>
          
          <button
            type="submit"
            disabled={!isFormValid() || isSubmitting}
            className="px-6 py-3 text-gray-900 font-medium hover:text-gray-700 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={isSubmitting ? "Skapar inlägg..." : "Skapa inlägg"}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Skapar inlägg...
              </span>
            ) : (
              "Skapa inlägg"
            )}
          </button>
        </div>
      </form>
  );
}
