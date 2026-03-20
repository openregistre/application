import { Link } from "@tanstack/react-router"
import { css } from "../../../styled-system/css/css"


export function PrivacyPage() {
    return (
        <div
            className={css({
                width: "100%",
                minHeight: "100dvh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "start",
                backgroundColor: "background",
            })}
        >
            {/* Content */}
            <div
                className={css({
                    width: "100%",
                    maxWidth: "64rem",
                    marginX: "auto",
                    paddingX: "1.5rem",
                    paddingY: "3rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "2rem",
                })}
            >
                <div className={css({ display: "flex", flexDirection: "column", gap: "0.5rem" })}>
                    <h1
                        className={css({
                            color: "primary",
                            fontSize: "2rem",
                            fontWeight: "400",
                            letterSpacing: "-0.02em",
                        })}
                    >
                        Politique de confidentialité
                    </h1>
                    <p className={css({ color: "neutral/50", fontSize: "1rem", lineHeight: "1.6" })}>
                        Comment nous collectons, utilisons et protégeons vos données personnelles.
                    </p>
                </div>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <p>
                        Le terme Service est défini dans les{" "}
                        <Link
                            to="/cgu"
                            className={css({ color: "primary", _hover: { textDecoration: "underline" } })}
                        >
                            conditions générales d'utilisation (CGU)
                        </Link>
                    </p>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        1. Responsable du traitement
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Le responsable du traitement des données personnelles est l'éditeur du Service, défini dans les{" "}
                        <Link
                            to="/mentions-légales"
                            className={css({ color: "primary", _hover: { textDecoration: "underline" } })}
                        >
                            mentions légales
                        </Link>
                        . Pour toute question relative à vos données personnelles, vous pouvez nous contacter à l'adresse{" "}
                        <a
                            href="mailto:contact@openregistre.com"
                            className={css({ color: "primary", _hover: { textDecoration: "underline" } })}
                        >
                            contact@openregistre.com
                        </a>.
                    </p>
                </section>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        2. Données collectées
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Dans le cadre de l'utilisation du Service, nous pouvons collecter les données suivantes :
                    </p>
                    <ul className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.8", paddingLeft: "1.5rem", listStyleType: "disc" })}>
                        <li>Données de consultation : pages consultées, recherches effectuées, horodatage des viServices</li>
                        <li>Données techniques de log : adresse IP, type de navigateur, système d'exploitation</li>
                    </ul>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Aucune donnée personnelle directement identifiable (nom, adresse e-mail, etc.) n'est collectée.
                    </p>
                </section>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        3. Finalités du traitement
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Les données collectées sont utilisées pour :
                    </p>
                    <ul className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.8", paddingLeft: "1.5rem", listStyleType: "disc" })}>
                        <li>Fournir et améliorer le Service</li>
                        <li>Assurer la sécurité du Service</li>
                        <li>Établir des statistiques d'utilisation anonymisées</li>
                    </ul>
                </section>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        4. Base légale
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Le traitement de vos données repose sur :
                    </p>
                    <ul className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.8", paddingLeft: "1.5rem", listStyleType: "disc" })}>
                        <li>L'exécution du contrat (CGU) pour les données nécessaires au fonctionnement du Service</li>
                        <li>L'intérêt légitime pour les statistiques d'utilisation et la sécurité</li>
                        <li>Le consentement pour toute collecte supplémentaire éventuelle</li>
                    </ul>
                </section>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        5. Durée de conservation
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Les données de consultation sont conservées indéfiniment. Les logs techniques sont conservés pendant une durée maximale de 12 mois.
                    </p>
                </section>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        6. Destinataires
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Vos données personnelles ne sont transmises à aucun tiers. Seuls les membres habilités de l'équipe ont accès aux données, dans la stricte mesure nécessaire au fonctionnement et à la maintenance du Service.
                    </p>
                </section>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        7. Transferts hors Union européenne
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Aucun transfert de données hors de l'Union européenne n'est effectué. L'ensemble des données est hébergé en France par OVH.
                    </p>
                </section>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        8. Sécurité
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Nous mettons en œuvre les mesures techniques et organisationnelles appropriées pour assurer la sécurité et la confidentialité des données, notamment via l'utilisation du protocole HTTPS et la restriction des accès aux données.
                    </p>
                </section>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        9. Vos droits
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
                    </p>
                    <ul className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.8", paddingLeft: "1.5rem", listStyleType: "disc" })}>
                        <li>Droit d'accès à vos données personnelles</li>
                        <li>Droit de rectification des données inexactes</li>
                        <li>Droit à l'effacement de vos données</li>
                        <li>Droit à la limitation du traitement</li>
                        <li>Droit à la portabilité de vos données</li>
                        <li>Droit d'opposition au traitement</li>
                    </ul>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Pour exercer ces droits, contactez-nous à l'adresse{" "}
                        <a
                            href="mailto:contact@openregistre.com"
                            className={css({ color: "primary", _hover: { textDecoration: "underline" } })}
                        >
                            contact@openregistre.com
                        </a>. Nous nous engageons à répondre dans un délai d'un mois.
                    </p>
                </section>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        10. Réclamation
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Si vous estimez que le traitement de vos données personnelles constitue une violation du RGPD, vous avez le droit d'introduire une réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL) :{" "}
                        <a
                            href="https://www.cnil.fr"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={css({ color: "primary", _hover: { textDecoration: "underline" } })}
                        >
                            www.cnil.fr
                        </a>.
                    </p>
                </section>

                <p className={css({ color: "neutral/25", fontSize: "0.8125rem", paddingTop: "1rem" })}>
                    Dernière mise à jour : 18 mars 2026
                </p>
            </div>
        </div>
    )
}
