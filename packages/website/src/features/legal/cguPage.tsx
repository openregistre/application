import { Link } from "@tanstack/react-router"
import { css } from "../../../styled-system/css/css"
import { Logo } from "../../components/layouts/logo"


export function CguPage() {
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
                        Conditions Generales d'Utilisation
                    </h1>
                    <p className={css({ color: "neutral/50", fontSize: "1rem", lineHeight: "1.6" })}>
                        Conditions regissant l'utilisation du service OpenRegistre.
                    </p>
                </div>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        1. Objet
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Les presentes Conditions Generales d'Utilisation (ci-apres "CGU") ont pour objet de definir les modalites et conditions d'utilisation du service OpenRegistre (ci-apres "le Service"), accessible a l'adresse openregistre.fr, ainsi que les droits et obligations des utilisateurs.
                    </p>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        L'utilisation du Service implique l'acceptation pleine et entiere des presentes CGU.
                    </p>
                </section>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        2. Description du service
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        OpenRegistre est un moteur de recherche gratuit et open source consacre aux personnalites publiques francaises. Le Service permet de rechercher des informations sur les personnalites politiques, de consulter leurs faits marquants et d'acceder aux sources journalistiques associees.
                    </p>
                </section>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        3. Inscription
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        L'inscription au Service est gratuite. Elle necessite la creation d'un compte utilisateur avec une adresse e-mail valide et un mot de passe. L'utilisateur s'engage a fournir des informations exactes et a maintenir la confidentialite de ses identifiants de connexion.
                    </p>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        L'utilisateur est seul responsable de l'utilisation faite de son compte.
                    </p>
                </section>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        4. Utilisation du service
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        L'utilisateur s'engage a utiliser le Service de maniere conforme aux lois et reglements en vigueur. Il est notamment interdit de :
                    </p>
                    <ul className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.8", paddingLeft: "1.5rem", listStyleType: "disc" })}>
                        <li>Utiliser le Service a des fins illegales ou non autorisees</li>
                        <li>Tenter d'acceder de maniere non autorisee aux systemes ou reseaux du Service</li>
                        <li>Collecter ou stocker des donnees personnelles d'autres utilisateurs</li>
                        <li>Interferer avec le bon fonctionnement du Service</li>
                    </ul>
                </section>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        5. Donnees et responsabilite
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Les informations presentees sur OpenRegistre sont issues de sources publiques et journalistiques. Chaque fait est systematiquement associe a ses sources. Bien que nous nous efforcions de garantir l'exactitude et l'actualite des informations, nous ne pouvons garantir l'absence totale d'erreurs.
                    </p>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Toute personne concernee par une information presentee sur le Service peut demander une correction ou une suppression en nous contactant.
                    </p>
                </section>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        6. Propriete intellectuelle
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Le code source d'OpenRegistre est distribue sous licence{" "}
                        <a
                            href="https://www.gnu.org/licenses/agpl-3.0.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={css({ color: "primary", _hover: { textDecoration: "underline" } })}
                        >
                            AGPL-3.0
                        </a>. Les contenus editoriaux et les donnees structurees du Service restent la propriete de Barbote SAS, sauf mention contraire.
                    </p>
                </section>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        7. Protection des donnees
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Le traitement des donnees personnelles est decrit dans notre{" "}
                        <Link
                            to="/confidentialite"
                            className={css({ color: "primary", _hover: { textDecoration: "underline" } })}
                        >
                            politique de confidentialite
                        </Link>. En utilisant le Service, l'utilisateur accepte les pratiques decrites dans cette politique.
                    </p>
                </section>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        8. Resiliation
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        L'utilisateur peut a tout moment supprimer son compte et cesser d'utiliser le Service. Barbote SAS se reserve le droit de suspendre ou de supprimer un compte en cas de violation des presentes CGU, sans preavis ni indemnite.
                    </p>
                </section>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        9. Modification des CGU
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Barbote SAS se reserve le droit de modifier les presentes CGU a tout moment. Les utilisateurs seront informes des modifications par une notification sur le Service. La poursuite de l'utilisation du Service apres modification vaut acceptation des nouvelles CGU.
                    </p>
                </section>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        10. Droit applicable
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Les presentes CGU sont soumises au droit francais. En cas de litige, et apres tentative de resolution amiable, les tribunaux de Paris seront seuls competents.
                    </p>
                </section>

                <p className={css({ color: "neutral/25", fontSize: "0.8125rem", paddingTop: "1rem" })}>
                    Derniere mise a jour : 18 mars 2026
                </p>
            </div>
        </div>
    )
}
