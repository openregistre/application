import { css } from "../../../styled-system/css/css"


export function PhilosophyPage() {
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
                        Notre philosophie
                    </h1>
                    <p className={css({ color: "neutral/50", fontSize: "1rem", lineHeight: "1.6" })}>
                        Pourquoi OpenRegistre existe, et comment nous concevons la transparence de l'information politique.
                    </p>
                </div>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        Notre vision
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Nous pensons que l'information sur l'activite politique des personnalites publiques devrait etre accessible a tous, facilement et gratuitement. Trop souvent, les faits marquants, les prises de position et les parcours politiques sont disperses dans des dizaines de sources differentes, rendant difficile pour les citoyens de se forger une opinion eclairee.
                    </p>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        OpenRegistre a ete cree pour centraliser ces informations et les rendre accessibles en quelques clics. Notre moteur de recherche permet de retrouver rapidement une personnalite publique, ses faits marquants et les sources journalistiques associees.
                    </p>
                </section>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        Pourquoi l'open source ?
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        La transparence est au coeur de notre projet. Il serait contradictoire de promouvoir la transparence de la vie publique tout en cachant le fonctionnement de notre outil. C'est pourquoi OpenRegistre est entierement open source, sous licence AGPL-3.0.
                    </p>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Chacun peut consulter notre code source, verifier nos methodes de collecte et de presentation des donnees, proposer des ameliorations ou signaler des erreurs. Cette transparence est notre meilleure garantie d'integrite.
                    </p>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Notre code source est disponible sur{" "}
                        <a
                            href="https://github.com/sketchlabdev/openregistre"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={css({ color: "primary", _hover: { textDecoration: "underline" } })}
                        >
                            GitHub
                        </a>.
                    </p>
                </section>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        Notre modele
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        OpenRegistre est un projet gratuit et ouvert. Nous ne vendons aucune donnee, nous n'affichons aucune publicite et nous ne proposons aucun abonnement payant. Notre objectif est uniquement de servir l'interet general en facilitant l'acces a l'information publique.
                    </p>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Le projet est developpe et maintenu par{" "}
                        <a
                            href="https://barbote.studio"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={css({ color: "primary", _hover: { textDecoration: "underline" } })}
                        >
                            Barbote
                        </a>, qui finance l'hebergement et le developpement.
                    </p>
                </section>

                <p className={css({ color: "neutral/25", fontSize: "0.8125rem", paddingTop: "1rem" })}>
                    Derniere mise a jour : 18 mars 2026
                </p>
            </div>
        </div>
    )
}
