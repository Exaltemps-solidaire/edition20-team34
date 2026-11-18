import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "../../page.module.css";
import { donateurs, libelleStatut, montantCumule, trouverDonateur } from "@/lib/donateurs";

export function generateStaticParams() {
  return donateurs.map((donateur) => ({ id: donateur.id }));
}

export default async function VueDonateur({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const donateur = trouverDonateur(id);
  if (!donateur) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <h1 className={styles.topbarTitle}>Vue 360 · {donateur.nom}</h1>
        <Link href="/" className={styles.topbarSub}>
          ‹ Retour
        </Link>
      </header>
      <main className={styles.main}>
        <h2>{donateur.nom}</h2>
        <span className={donateur.statut.type === "enCours" ? `${styles.badge} ${styles.enCours}` : styles.badge}>
          {libelleStatut(donateur.statut)}
        </span>

        <div className={styles.kpiRow}>
          <div className={styles.kpiCard}>
            <div className={styles.kpiValue}>{donateur.historique.nombreDons}</div>
            <div className={styles.kpiLabel}>Dons au total</div>
          </div>
          <div className={styles.kpiCard}>
            <div className={`${styles.kpiValue} ${styles.pink}`}>
              {montantCumule(donateur.historique)} €
            </div>
            <div className={styles.kpiLabel}>Montant cumulé</div>
          </div>
        </div>

        <div className={styles.detail}>Premier don · {donateur.historique.premierDon}</div>
        <div className={styles.detail}>
          Dernier don · {donateur.dernierDon} · {donateur.source}
        </div>
        <div className={styles.detail}>Raison du dernier don : {donateur.raison}</div>

        <div className={styles.alertBox}>
          {donateur.nom} est isolé(e) du flux général depuis la détection du seuil : aucune
          campagne de fin d&apos;année ni relance habituelle ne lui sera adressée.
        </div>
      </main>
    </div>
  );
}
