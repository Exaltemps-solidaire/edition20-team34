import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "../../../../page.module.css";
import {
  ENVOIS_MAX_CYCLE,
  OBJECTIF_ENVOIS_SIX_SEMAINES,
  OUTILS_CONSULTES,
  donateurs,
  trouverDonateur,
} from "@/lib/donateurs";

export function generateStaticParams() {
  return donateurs.map((donateur) => ({ id: donateur.id }));
}

export default async function ConfirmationCycle({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const donateur = trouverDonateur(id);
  if (!donateur) {
    notFound();
  }

  const prenom = donateur.nom.split(" ")[0];

  return (
    <div className={styles.screen}>
      <header className={styles.topbar}>
        <Image className={styles.topbarLogo} src="/logo.png" alt="Imagine for Margo" width={72} height={36} />
        <div>
          <div className={styles.topbarTitle}>Imagine for Margo</div>
          <div className={styles.topbarSub}>Responsable collecte</div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.confirmIcon}>✅</div>
        <h2 className={styles.confirmTitle}>Cycle lancé avec succès</h2>
        <div className={styles.confirmSub}>
          Le cycle de réactivation de <strong>{donateur.nom}</strong> est actif. Il/elle est
          isolé(e) du flux général.
        </div>

        <div className={styles.card}>
          <div className={styles.cardTitle}>Récapitulatif</div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Donateur</span>
            <span className={styles.infoValue}>{donateur.nom}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Message 1</span>
            <span className={`${styles.infoValue} ${styles.blue}`}>Envoyé · J+0</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Message 2</span>
            <span className={styles.infoValue}>Planifié · J+21 (si aucun don)</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Envois max</span>
            <span className={`${styles.infoValue} ${styles.highlight}`}>{ENVOIS_MAX_CYCLE} au total</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Flux général</span>
            <span className={`${styles.infoValue} ${styles.highlight}`}>Exclu · cycle isolé</span>
          </div>
        </div>

        <div className={styles.cardPink}>
          <div className={styles.cardTitle}>Hypothèses vérifiables</div>
          <div className={styles.impactRow}>
            <strong>Envois sur 6 semaines :</strong>&nbsp;{ENVOIS_MAX_CYCLE} (objectif : &lt;{" "}
            {OBJECTIF_ENVOIS_SIX_SEMAINES})
          </div>
          <div className={styles.impactRow}>
            <strong>Envois après l&apos;invitation :</strong>&nbsp;0 (objectif : 0)
          </div>
          <div className={styles.impactRow}>
            <strong>Outils consultés :</strong>&nbsp;{OUTILS_CONSULTES} — le CRM seul (objectif :{" "}
            {OUTILS_CONSULTES})
          </div>
        </div>

        <Link href="/" className={styles.btnPrimary}>
          ← Retour à la liste
        </Link>
        <Link href={`/donateur/${donateur.id}`} className={styles.btnSecondary}>
          Revoir le profil de {prenom}
        </Link>
      </main>
    </div>
  );
}
