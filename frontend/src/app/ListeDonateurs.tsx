"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { type Donateur, libelleStatut, nombrePages, paginer } from "@/lib/donateurs";

const PAR_PAGE = 10;

export default function ListeDonateurs({ donateurs }: { donateurs: Donateur[] }) {
  const [page, setPage] = useState(1);
  const total = nombrePages(donateurs.length, PAR_PAGE);
  const visibles = paginer(donateurs, page, PAR_PAGE);

  return (
    <>
      <ul className={styles.liste}>
        {visibles.map((donateur, index) => (
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

      {total > 1 && (
        <nav className={styles.pagination} aria-label="Pagination des donateurs">
          {Array.from({ length: total }, (_, i) => i + 1).map((numero) => (
            <button
              key={numero}
              type="button"
              className={numero === page ? `${styles.pageBtn} ${styles.pageBtnActive}` : styles.pageBtn}
              onClick={() => setPage(numero)}
            >
              {numero}
            </button>
          ))}
          <button
            type="button"
            className={styles.pageBtn}
            disabled={page === total}
            onClick={() => setPage((p) => Math.min(p + 1, total))}
          >
            Suivant ›
          </button>
        </nav>
      )}
    </>
  );
}
