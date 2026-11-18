import styles from "./page.module.css";
import { donateurs, libelleStatut } from "@/lib/donateurs";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <h1 className={styles.topbarTitle}>Imagine for Margo</h1>
        <div className={styles.topbarSub}>Responsable collecte</div>
      </header>
      <main className={styles.main}>
        <h2>Donateurs à réactiver</h2>
        <p>Sans don depuis ≥ 13 mois · détectés par le CRM</p>

        <div className={styles.kpiRow}>
          <div className={styles.kpiCard}>
            <div className={styles.kpiValue}>{donateurs.length}</div>
            <div className={styles.kpiLabel}>Donateurs à réactiver</div>
          </div>
          <div className={styles.kpiCard}>
            <div className={`${styles.kpiValue} ${styles.pink}`}>9</div>
            <div className={styles.kpiLabel}>Envois max évités par donateur</div>
          </div>
        </div>

        <div className={styles.alertBox}>
          Ces donateurs n&apos;appartiennent pas au flux général des campagnes actives. Le cycle
          court s&apos;arrête après l&apos;invitation unique à redonner.
        </div>

        <ul className={styles.liste}>
          {donateurs.map((donateur) => (
            <li key={donateur.id} className={styles.donateur}>
              <div className={styles.nom}>{donateur.nom}</div>
              <div className={styles.detail}>
                Dernier don · {donateur.dernierDon} · {donateur.source}
              </div>
              <div className={styles.detail}>Raison : {donateur.raison}</div>
              <span
                className={
                  donateur.statut.type === "enCours"
                    ? `${styles.badge} ${styles.enCours}`
                    : styles.badge
                }
              >
                {libelleStatut(donateur.statut)}
              </span>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
