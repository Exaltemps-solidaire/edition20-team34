import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "../../page.module.css";
import { donateurs, libelleStatut, montantCumule, phrasesImpact, trouverDonateur } from "@/lib/donateurs";

export function generateStaticParams() {
  return donateurs.map((donateur) => ({ id: donateur.id }));
}

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

export default async function VueDonateur({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const donateur = trouverDonateur(id);
  if (!donateur) {
    notFound();
  }

  return (
    <div className={styles.screen}>
      <header className={styles.topbar}>
        <LogoI4M />
        <div>
          <div className={styles.topbarTitle}>Vue 360 · donateur</div>
          <div className={styles.topbarSub}>Données pour personnaliser le cycle</div>
        </div>
        <Link href="/" className={styles.backBtn}>
          ‹ Retour
        </Link>
      </header>

      <div className={styles.hero}>
        <div className={styles.heroLabel}>Profil donateur</div>
        <h2 className={styles.heroName}>{donateur.nom}</h2>
        <div className={styles.heroMeta}>Entrée en base · {donateur.historique.premierDon}</div>
        <div
          className={
            donateur.statut.type === "enCours"
              ? `${styles.statusBadge} ${styles.actif}`
              : `${styles.statusBadge} ${styles.inactif}`
          }
        >
          <span className={styles.dot} />
          {donateur.statut.type === "enCours" ? libelleStatut(donateur.statut) : `À réactiver · ${libelleStatut(donateur.statut)}`}
        </div>
      </div>

      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Historique de don</div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Nombre de dons</span>
            <span className={`${styles.infoValue} ${styles.blue}`}>
              {donateur.historique.nombreDons} dons au total
            </span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Premier don</span>
            <span className={styles.infoValue}>{donateur.historique.premierDon}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Montant cumulé</span>
            <span className={`${styles.infoValue} ${styles.blue}`}>
              {donateur.historique.nombreDons} × {donateur.historique.donMoyen} € ={" "}
              {montantCumule(donateur.historique)} €
            </span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Don moyen</span>
            <span className={`${styles.infoValue} ${styles.blue}`}>{donateur.historique.donMoyen} €</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Dernier don</span>
            <span className={`${styles.infoValue} ${styles.highlight}`}>{donateur.dernierDon}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Raison du dernier don</span>
            <span className={styles.infoValue}>{donateur.raison}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Source principale</span>
            <span className={styles.infoValue}>{donateur.source}</span>
          </div>
        </div>

        <div>
          <div className={styles.sectionLabel}>Profil &amp; porte d&apos;entrée</div>
          <div className={styles.chips} style={{ marginTop: 8 }}>
            {donateur.profil.map((item) => (
              <span
                key={item}
                className={item.toLowerCase().includes("événement") ? `${styles.chip} ${styles.event}` : styles.chip}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className={styles.sectionLabel}>Événements auxquels {donateur.nom.split(" ")[0]} a participé</div>
          <div className={styles.eventList} style={{ marginTop: 8 }}>
            {donateur.evenements.map((evenement, index) => (
              <div className={styles.eventItem} key={`${evenement.nom}-${index}`}>
                <div className={styles.eventName}>{evenement.nom}</div>
                <div className={styles.eventDate}>{evenement.date}</div>
                <span
                  className={
                    evenement.origine === "Externe" ? `${styles.eventBadge} ${styles.externe}` : styles.eventBadge
                  }
                >
                  {evenement.origine}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTitle}>Impact de ses dons</div>
          {phrasesImpact(donateur).map((phrase) => (
            <div className={styles.impactRow} key={phrase}>
              {phrase}
            </div>
          ))}
        </div>

        <div className={styles.alertBox}>
          <strong>{donateur.nom}</strong> est isolé(e) du flux général depuis la détection du
          seuil : aucune campagne de fin d&apos;année ni relance habituelle ne lui sera adressée.
        </div>

        <Link href={`/donateur/${donateur.id}/cycle`} className={styles.btnPrimary}>
          Préparer le cycle de réactivation →
        </Link>
      </main>
    </div>
  );
}
