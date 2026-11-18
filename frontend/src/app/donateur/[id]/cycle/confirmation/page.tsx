import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "../../../../page.module.css";
import { donateurs, trouverDonateur } from "@/lib/donateurs";

export function generateStaticParams() {
  return donateurs.map((donateur) => ({ id: donateur.id }));
}

export default async function ConfirmationCycle({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const donateur = trouverDonateur(id);
  if (!donateur) {
    notFound();
  }

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
        <h2 className={styles.heroName} style={{ color: "var(--i4m-bleu)" }}>
          Cycle lancé avec succès
        </h2>
        <div className={styles.infoLabel}>
          Le cycle de réactivation de {donateur.nom} est actif. Il/elle est isolé(e) du flux
          général.
        </div>

        <Link href="/" className={styles.btnPrimary}>
          ← Retour à la liste
        </Link>
      </main>
    </div>
  );
}
