import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { donateurs, libelleStatut } from "@/lib/donateurs";

function LogoI4M() {
  return (
    <Image
      className={styles.topbarLogo}
      src="/logo.png"
      alt="Imagine for Margo"
      width={72}
      height={36}
      priority
    />
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
