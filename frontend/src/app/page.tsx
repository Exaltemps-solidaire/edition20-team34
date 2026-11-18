import Link from "next/link";
import styles from "./page.module.css";
import { donateurs, libelleStatut } from "@/lib/donateurs";

function LogoI4M() {
  return (
    <svg className={styles.topbarLogo} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18" cy="18" r="18" fill="#E0ECFA" />
      <ellipse cx="12" cy="15" rx="5" ry="3" fill="#11A2DD" transform="rotate(-30 12 15)" />
      <ellipse cx="24" cy="15" rx="5" ry="3" fill="#EC64A0" transform="rotate(30 24 15)" />
      <circle cx="18" cy="19" r="3" fill="#E64587" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className={styles.screen}>
      <header className={styles.topbar}>
        <LogoI4M />
        <div>
          <div className={styles.topbarTitle}>Imagine for Margo</div>
          <div className={styles.topbarSub}>Responsable collecte</div>
        </div>
      </header>

      <div className={styles.hero}>
        <div className={styles.heroLabel}>Cycle de réactivation</div>
        <h2 className={styles.heroName}>Donateurs inactifs</h2>
        <div className={styles.heroMeta}>Sans don depuis ≥ 13 mois · détectés par le CRM</div>
        <div className={`${styles.statusBadge} ${styles.actif}`}>
          <span className={styles.dot} />
          {donateurs.length} profils à traiter
        </div>
      </div>

      <main className={styles.main}>
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
          Ces donateurs <strong>n&apos;appartiennent pas</strong> au flux général des campagnes
          actives. Le cycle court s&apos;arrête après l&apos;invitation unique à redonner.
        </div>

        <ul className={styles.liste}>
          {donateurs.map((donateur, index) => (
            <li key={donateur.id}>
              <Link href={`/donateur/${donateur.id}`} className={styles.donateur}>
                <div className={index % 2 === 0 ? styles.avatar : `${styles.avatar} ${styles.pink}`}>
                  {donateur.initiales}
                </div>
                <div className={styles.donateurInfo}>
                  <div className={styles.nom}>{donateur.nom}</div>
                  <div className={styles.detail}>
                    Dernier don · {donateur.dernierDon} · {donateur.source}
                  </div>
                  <div className={styles.raison}>Raison : {donateur.raison}</div>
                  <span
                    className={
                      donateur.statut.type === "enCours"
                        ? `${styles.badge} ${styles.enCours}`
                        : styles.badge
                    }
                  >
                    {libelleStatut(donateur.statut)}
                  </span>
                </div>
                <div className={styles.arrow}>›</div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
