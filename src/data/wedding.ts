/**
 * Central wedding configuration — edit this file to personalize the invitation.
 * Languages: Arabic (ar) + French (fr).
 */
export const wedding = {
  groom: {
    ar: 'زهير',
    fr: 'Zouhair',
  },
  bride: {
    ar: 'ايمان',
    fr: 'Imane',
  },
  /** ISO date of the celebration (local evening). */
  dateISO: '2026-08-20T17:00:00',
  dateDisplay: {
    ar: '20 اوت 2026',
    fr: '20.08.26',
  },
  weekday: {
    ar: 'يوم الخميس',
    fr: 'Jeudi',
  },
  tagline: {
    ar: 'روحانِ · قدرٌ واحد · عمرٌ كتبه الله',
    fr: 'Deux âmes · Un destin · Une vie écrite par Allah',
  },
  invitation: {
    ar: 'يسعدنا دعوتكم لمشاركتنا فرحة زفافنا ويشرفنا حضوركم في هذا اليوم السعيد',
    fr: 'Nous sommes ravis de vous inviter à partager la joie de notre mariage, et honorés par votre présence en ce jour heureux',
    /** Four-line layout for the ceremony card under the Quran. */
    lines: [
      'يسعدنا دعوتكم',
      'لمشاركتنا فرحة زفافنا',
      'ويشرفنا حضوركم',
      'في هذا اليوم السعيد.',
    ],
  },
  ceremonyTitle: {
    ar: 'حفل الزفاف',
    fr: 'Cérémonie de mariage',
  },
  verse: {
    ar: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ',
    line1:
      'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا',
    line2:
      'وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ',
    ref: 'سورة الروم، الآية 21',
    refDisplay: '﴿ سورة الروم، الآية 21 ﴾',
  },
  bismillah: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
  location: {
    label: {
      ar: 'موقع الحفل',
      fr: 'Lieu de la cérémonie',
    },
    name: {
      ar: 'قصر علاء الدين',
      fr: 'Palais Aladdin',
    },
    addressLines: {
      ar: ['تجزئة 16، طريق فاس', 'مكناس، المغرب'],
      fr: ['Lot 16, Route de Fès', 'Meknès, Maroc'],
    },
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Palais+Aladdin+Meknes+Morocco',
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=Palais+Aladdin+Meknes+Morocco',
    /** Embeddable map query for the in-card preview. */
    mapEmbedQuery: 'Palais+Aladdin+Meknes+Morocco',
  },
  guestMessage: {
    title: {
      ar: 'رسالة إلى ضيوفنا الكرام',
      fr: 'Message à nos chers invités',
    },
    lines: {
      ar: [
        'حفاظاً على خصوصية هذا الاحتفال وجماله،',
        'نشكركم من القلب على عدم التقاط أو',
        'مشاركة الصور ومقاطع الفيديو دون',
        'إذن العروسين.',
      ],
      fr: [
        'Afin de préserver l’intimité et la beauté de cette célébration,',
        'nous vous remercions de ne pas prendre ni partager',
        'de photos ou de vidéos sans',
        'l’autorisation des mariés.',
      ],
    },
  },
  schedule: [
    { time: '٥ م', title: { ar: 'استقبال الضيوف', fr: 'Accueil des invités' } },
    { time: '٦ م', title: { ar: 'عقد القران', fr: 'Cérémonie du Nikah' } },
    { time: '٧ م', title: { ar: 'ساعة المشروبات', fr: 'Heure des boissons' } },
    { time: '٨ م', title: { ar: 'العشاء', fr: 'Dîner' } },
    { time: '٩ م', title: { ar: 'الطرب والرقص', fr: 'Danse' } },
  ],
  dressCode: {
    ar: 'نرجو من الضيوف الكرام تجنّب ارتداء اللون الأحمر الغامق والماروني.',
    fr: 'Nous prions les invités d’éviter le rouge foncé et le bordeaux.',
  },
  giftNote: {
    ar: 'لطفاً، نفضّل عدم إحضار الهدايا المغلّفة.',
    fr: 'Merci de ne pas apporter de cadeaux emballés.',
  },
  rsvpDeadline: {
    ar: 'يرجى تأكيد الحضور قبل ٩ اوت',
    fr: 'Merci de confirmer avant le 9 août',
  },
} as const

export type WeddingConfig = typeof wedding
