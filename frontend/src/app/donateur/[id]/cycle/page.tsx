import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "../../../page.module.css";
import {
  donateurs,
  mentionEvenementielle,
  messageBilanImpact,
  messageInvitation,
  trouverDonateur,
} from "@/lib/donateurs";

export function generateStaticParams() {
  return donateurs.map((donateur) => ({ id: donateur.id }));
}

export default async function CycleDonateur({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const donateur = trouverDonateur(id);
  if (!donateur) {
    notFound();
  }

  const mention = mentionEvenementielle(donateur);

  return (
    <div className={styles.screen}>
      <header className={styles.topbar}>
        <Image className={styles.topbarLogo} src="/logo.png" alt="Imagine for Margo" width={72} height={36} />
        <div>
          <div className={styles.topbarTitle}>Cycle de réactivation · I2</div>
          <div className={styles.topbarSub}>{donateur.nom}</div>
        </div>
        <Link href={`/donateur/${donateur.id}`} className={styles.backBtn}>
          ‹ Retour
        </Link>
      </header>

      <div className={styles.hero}>
        <div className={styles.heroLabel}>Séquence &amp; règle d&apos;arrêt</div>
        <h2 className={styles.heroName}>2 contacts maximum</h2>
        <div className={styles.heroMeta}>Pas de réintégration automatique au flux général</div>
      </div>

      <main className={styles.main}>
        <div className={styles.sectionLabel}>Les étapes du cycle</div>

        <div className={styles.cycleSteps}>
          <div className={styles.cycleStep}>
            <div className={styles.stepLine} />
            <div className={styles.stepDot}>1</div>
            <div className={styles.stepBody}>
              <div className={styles.stepTitle}>Bilan d&apos;impact — sans demande de don</div>
              <div className={styles.stepDesc}>J+0 · Email personnalisé</div>
              <div className={styles.stepTag}>Source : {donateur.source}</div>
            </div>
          </div>

          <div className={styles.cycleStep}>
            <div className={styles.stepLine} />
            <div className={styles.stepDot}>⏳</div>
            <div className={styles.stepBody}>
              <div className={styles.stepTitle}>Attente : 21 jours</div>
              <div className={styles.stepDesc}>Le CRM vérifie si un don a été enregistré</div>
              <div className={styles.stepTag}>Aucun don reçu → étape 2</div>
            </div>
          </div>

          <div className={styles.cycleStep}>
            <div className={styles.stepLine} />
            <div className={styles.stepDot}>2</div>
            <div className={styles.stepBody}>
              <div className={styles.stepTitle}>Invitation unique à redonner</div>
              <div className={styles.stepDesc}>J+21 · Email avec proposition de don</div>
              {mention && <div className={styles.stepTag}>{mention}</div>}
            </div>
          </div>

          <div className={styles.cycleStep}>
            <div className={`${styles.stepDot} ${styles.done}`}>✕</div>
            <div className={styles.stepBody}>
              <div className={styles.stepTitle}>Fin du cycle — arrêt complet</div>
              <div className={styles.stepDesc}>Après l&apos;invitation, plus aucun envoi</div>
              <div className={`${styles.stepTag} ${styles.stop}`}>0 envoi supplémentaire</div>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTitle}>Règle d&apos;arrêt</div>
          <div className={styles.infoLabel}>
            Si aucun don n&apos;est enregistré après l&apos;invitation unique, {donateur.nom} n&apos;est
            pas réintégré(e) aux campagnes destinées aux donateurs actifs. Le cycle s&apos;arrête
            définitivement.
          </div>
        </div>

        <hr className={styles.divider} />

        <div className={styles.sectionLabel}>Message 1 — Bilan d&apos;impact (J+0)</div>
        <div className={styles.messagePreview}>
          <div className={styles.msgHeader}>Suggestion · à adapter si besoin</div>
          <div className={styles.msgSubject}>Objet : « Ce que votre élan a rendu possible »</div>
          <div className={styles.msgBody}>{messageBilanImpact(donateur)}</div>
        </div>
        <div className={styles.msgHint}>
          Ce texte est pré-rempli depuis la vue 360. Il n&apos;est pas encore modifiable dans cette
          version.
        </div>

        <hr className={styles.divider} />

        <div className={styles.sectionLabel}>Message 2 — Invitation à redonner (J+21)</div>
        <div className={`${styles.messagePreview} ${styles.pink}`}>
          <div className={styles.msgHeader}>Suggestion · à adapter si besoin</div>
          <div className={styles.msgSubject}>Objet : « Une nouvelle course vous attend »</div>
          <div className={styles.msgBody}>{messageInvitation(donateur)}</div>
        </div>
        <div className={styles.msgHint}>
          Envoyé uniquement si aucun don n&apos;a été enregistré 21 jours après le message 1.
        </div>

        <div className={styles.sectionLabel} style={{ marginTop: 4 }}>
          Agenda des événements à venir
        </div>
        <a
          className={styles.agendaLink}
          href="https://www.imagineformargo.org/evenements/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div>
            <div className={styles.agendaTitle}>imagineformargo.org/evenements</div>
            <div className={styles.agendaSub}>Courses, rallyes, actions tiers</div>
          </div>
        </a>

        <Link href={`/donateur/${donateur.id}/cycle/confirmation`} className={styles.btnPrimary}>
          Valider et lancer le cycle →
        </Link>
      </main>
    </div>
  );
}
