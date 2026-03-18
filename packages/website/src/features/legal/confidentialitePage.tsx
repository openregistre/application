import { Link } from "@tanstack/react-router"
import { css } from "../../../styled-system/css/css"
import { Logo } from "../../components/layouts/logo"


export function ConfidentialitePage() {
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
            {/* Top bar */}
            <div
                className={css({
                    width: "100%",
                    borderBottomWidth: "1px",
                    borderBottomColor: "neutral/10",
                    backgroundColor: "white",
                })}
            >
                <div
                    className={css({
                        width: "100%",
                        maxWidth: "64rem",
                        marginX: "auto",
                        paddingX: "1.5rem",
                        paddingY: "1rem",
                    })}
                >
                    <Link
                        to="/"
                        className={css({
                            display: "flex",
                            justifyContent: "start",
                            alignItems: "center",
                        })}
                    >
                        <Logo />
                        <span
                            className={css({
                                color: "primary",
                                fontSize: "1rem",
                                fontWeight: "400",
                                letterSpacing: "-0.02em",
                            })}
                        >
                            OpenRegistre
                        </span>
                    </Link>
                </div>
            </div>

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
                        Politique de confidentialite
                    </h1>
                    <p className={css({ color: "neutral/50", fontSize: "1rem", lineHeight: "1.6" })}>
                        Comment nous collectons, utilisons et protegeons vos donnees personnelles.
                    </p>
                </div>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        1. Responsable du traitement
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Le responsable du traitement des donnees personnelles est Barbote SAS, 93 rue Sedaine, 75011 Paris, France. Pour toute question relative a vos donnees personnelles, vous pouvez nous contacter a l'adresse{" "}
                        <a
                            href="mailto:contact@barbote.studio"
                            className={css({ color: "primary", _hover: { textDecoration: "underline" } })}
                        >
                            contact@barbote.studio
                        </a>.
                    </p>
                </section>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        2. Donnees collectees
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Dans le cadre de l'utilisation du Service, nous pouvons collecter les donnees suivantes :
                    </p>
                    <ul className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.8", paddingLeft: "1.5rem", listStyleType: "disc" })}>
                        <li>Donnees d'inscription : adresse e-mail, mot de passe (chiffre)</li>
                        <li>Donnees de navigation : pages consultees, recherches effectuees, horodatage des visites</li>
                        <li>Donnees techniques : adresse IP, type de navigateur, systeme d'exploitation</li>
                    </ul>
                </section>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        3. Finalites du traitement
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Les donnees collectees sont utilisees pour :
                    </p>
                    <ul className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.8", paddingLeft: "1.5rem", listStyleType: "disc" })}>
                        <li>Fournir et ameliorer le Service</li>
                        <li>Gerer les comptes utilisateurs</li>
                        <li>Assurer la securite du Service</li>
                        <li>Etablir des statistiques d'utilisation anonymisees</li>
                    </ul>
                </section>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        4. Base legale
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Le traitement de vos donnees repose sur :
                    </p>
                    <ul className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.8", paddingLeft: "1.5rem", listStyleType: "disc" })}>
                        <li>L'execution du contrat (CGU) pour les donnees necessaires au fonctionnement du Service</li>
                        <li>L'interet legitime pour les statistiques d'utilisation et la securite</li>
                        <li>Le consentement pour toute collecte supplementaire eventuelle</li>
                    </ul>
                </section>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        5. Duree de conservation
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Les donnees personnelles sont conservees pendant la duree d'utilisation du Service. En cas de suppression de compte, les donnees sont supprimees dans un delai de 30 jours, a l'exception des donnees que nous sommes tenus de conserver pour des raisons legales.
                    </p>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Les donnees de navigation et les logs techniques sont conserves pendant une duree maximale de 12 mois.
                    </p>
                </section>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        6. Destinataires
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Vos donnees personnelles ne sont transmises a aucun tiers. Seuls les membres habilites de l'equipe Barbote SAS ont acces aux donnees, dans la stricte mesure necessaire au fonctionnement et a la maintenance du Service.
                    </p>
                </section>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        7. Transferts hors Union europeenne
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Aucun transfert de donnees hors de l'Union europeenne n'est effectue. L'ensemble des donnees est heberge en France par OVH.
                    </p>
                </section>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        8. Securite
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Nous mettons en oeuvre les mesures techniques et organisationnelles appropriees pour assurer la securite et la confidentialite de vos donnees personnelles, notamment le chiffrement des mots de passe, l'utilisation du protocole HTTPS et la restriction des acces aux donnees.
                    </p>
                </section>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        9. Vos droits
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Conformement au Reglement General sur la Protection des Donnees (RGPD), vous disposez des droits suivants :
                    </p>
                    <ul className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.8", paddingLeft: "1.5rem", listStyleType: "disc" })}>
                        <li>Droit d'acces a vos donnees personnelles</li>
                        <li>Droit de rectification des donnees inexactes</li>
                        <li>Droit a l'effacement de vos donnees</li>
                        <li>Droit a la limitation du traitement</li>
                        <li>Droit a la portabilite de vos donnees</li>
                        <li>Droit d'opposition au traitement</li>
                    </ul>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Pour exercer ces droits, contactez-nous a l'adresse{" "}
                        <a
                            href="mailto:contact@barbote.studio"
                            className={css({ color: "primary", _hover: { textDecoration: "underline" } })}
                        >
                            contact@barbote.studio
                        </a>. Nous nous engageons a repondre dans un delai d'un mois.
                    </p>
                </section>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        10. Reclamation
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Si vous estimez que le traitement de vos donnees personnelles constitue une violation du RGPD, vous avez le droit d'introduire une reclamation aupres de la Commission Nationale de l'Informatique et des Libertes (CNIL) :{" "}
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
                    Derniere mise a jour : 18 mars 2026
                </p>
            </div>
        </div>
    )
}
