import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import { wedding } from '../../data/wedding'
import { OrnamentDivider } from '../Ornaments'
import { Reveal } from '../Reveal'

type Attendance = 'yes' | 'no' | ''

/**
 * RSVP form — client-side for now; wire to an API / Formspree later.
 */
export function Rsvp() {
  const { lang, t } = useLanguage()
  const [name, setName] = useState('')
  const [attendance, setAttendance] = useState<Attendance>('')
  const [guests, setGuests] = useState('1')
  const [song, setSong] = useState('')
  const [children, setChildren] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !attendance) {
      setError(
        lang === 'ar'
          ? 'يرجى إدخال الاسم وتأكيد الحضور'
          : 'Veuillez saisir votre nom et confirmer votre présence',
      )
      return
    }
    setError('')
    // Persist locally until a backend is connected
    const payload = { name, attendance, guests, song, children, at: Date.now() }
    try {
      const prev = JSON.parse(localStorage.getItem('rsvp-list') || '[]') as unknown[]
      localStorage.setItem('rsvp-list', JSON.stringify([...prev, payload]))
    } catch {
      /* ignore quota / private mode */
    }
    setSubmitted(true)
  }

  return (
    <section
      id="rsvp"
      className="relative px-6 py-24 md:py-32"
      style={{ background: 'var(--color-cream)' }}
    >
      <Reveal className="mx-auto max-w-lg text-center">
        <p className="font-ui text-[11px] tracking-[0.28em] text-gold/60 uppercase">
          RSVP
        </p>
        <h2 className="mt-3 font-display text-3xl text-ink md:text-4xl">
          {lang === 'ar' ? 'تأكيد الحضور' : 'Confirmer votre présence'}
        </h2>
        <OrnamentDivider className="mx-auto mt-5 h-6 w-36 text-gold/50" />
        <p className="mt-4 font-ui text-sm text-ink/50">
          {t(wedding.rsvpDeadline)}
        </p>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="thanks"
              className="mt-12 border border-gold/25 px-8 py-12"
              style={{
                background:
                  'linear-gradient(165deg, rgba(245,240,230,0.97), rgba(232,223,208,0.97))',
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            >
              <p className="font-display text-2xl text-ink">
                {lang === 'ar' ? 'شكراً لتأكيدكم' : 'Merci'}
              </p>
              <p className="mt-3 font-ui text-sm text-ink/60">
                {lang === 'ar'
                  ? 'نتطلع لرؤيتكم في يوم الفرح'
                  : 'Nous avons hâte de célébrer avec vous'}
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="mt-12 space-y-6 text-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Field
                label={lang === 'ar' ? 'الاسم' : 'Votre nom'}
                htmlFor="rsvp-name"
              >
                <input
                  id="rsvp-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="field-input"
                  autoComplete="name"
                />
              </Field>

              <fieldset className="space-y-2">
                <legend className="font-ui text-sm text-ink/65">
                  {lang === 'ar' ? 'هل ستحضرون؟' : 'Serez-vous présents ?'}
                </legend>
                <div className="flex flex-col gap-2 sm:flex-row">
                  {(
                    [
                      {
                        value: 'yes' as const,
                        ar: 'يسعدني الحضور',
                        fr: 'Accepte avec plaisir',
                      },
                      {
                        value: 'no' as const,
                        ar: 'أعتذر عن الحضور',
                        fr: 'Décline avec regret',
                      },
                    ] as const
                  ).map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex flex-1 cursor-pointer items-center justify-center border px-4 py-3 font-ui text-sm transition-colors duration-400 ${
                        attendance === opt.value
                          ? 'border-gold bg-gold/15 text-gold-muted'
                          : 'border-gold/25 text-ink/55 hover:border-gold/45'
                      }`}
                    >
                      <input
                        type="radio"
                        name="attendance"
                        value={opt.value}
                        checked={attendance === opt.value}
                        onChange={() => setAttendance(opt.value)}
                        className="sr-only"
                      />
                      {opt[lang]}
                    </label>
                  ))}
                </div>
              </fieldset>

              {attendance === 'yes' && (
                <>
                  <Field
                    label={
                      lang === 'ar'
                        ? 'عدد الضيوف الحاضرين'
                        : 'Nombre d’invités présents'
                    }
                    htmlFor="rsvp-guests"
                  >
                    <input
                      id="rsvp-guests"
                      type="number"
                      min={1}
                      max={10}
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="field-input"
                    />
                  </Field>

                  <Field
                    label={
                      lang === 'ar'
                        ? 'أغنية تحب الرقص عليها'
                        : 'Une chanson pour danser'
                    }
                    htmlFor="rsvp-song"
                  >
                    <input
                      id="rsvp-song"
                      value={song}
                      onChange={(e) => setSong(e.target.value)}
                      className="field-input"
                    />
                  </Field>

                  <Field
                    label={
                      lang === 'ar'
                        ? 'الأطفال الحاضرون (الأسماء والأعمار)'
                        : 'Enfants présents (noms et âges)'
                    }
                    htmlFor="rsvp-children"
                  >
                    <textarea
                      id="rsvp-children"
                      value={children}
                      onChange={(e) => setChildren(e.target.value)}
                      rows={3}
                      className="field-input resize-none"
                    />
                  </Field>
                </>
              )}

              {error && (
                <p className="font-ui text-sm text-rose" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-3 rounded-full bg-gold px-6 py-3.5 font-ui text-sm font-medium text-ink transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-gold-bright active:scale-[0.98]"
              >
                {lang === 'ar' ? 'إرسال' : 'Envoyer'}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </Reveal>

      <style>{`
        .field-input {
          width: 100%;
          background: color-mix(in srgb, var(--color-cream) 80%, transparent);
          border: 1px solid color-mix(in srgb, var(--color-gold) 30%, transparent);
          color: var(--color-ink);
          font-family: var(--font-ui);
          font-size: 0.9375rem;
          padding: 0.75rem 1rem;
          outline: none;
          transition: border-color 0.4s cubic-bezier(0.32, 0.72, 0, 1);
        }
        .field-input:focus {
          border-color: color-mix(in srgb, var(--color-gold) 70%, transparent);
        }
      `}</style>
    </section>
  )
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="font-ui text-sm text-ink/65">
        {label}
      </label>
      {children}
    </div>
  )
}
