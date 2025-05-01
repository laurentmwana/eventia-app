import { PaginationData } from "@/types/paginate";
import { ButtonLink } from "./button-link";

export const Pagination = ({
    items,
}: {
    items: PaginationData<{}>;
}) => {
    if (items.links.length < 4) {
        return null;
    }

    return (
        <nav className="flex items-center justify-between border-t  px-4 sm:px-0 mt-6">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between mt-6">
                <div>
                    <p className="text-sm text-muted-foreground">
                        Affichage de{" "}
                        <span className="font-medium">{items.from}</span> à{" "}
                        <span className="font-medium">{items.to}</span> sur{" "}
                        <span className="font-medium">{items.total}</span>{" "}
                        résultats
                    </p>
                </div>
                <div>
                    <ul className="inline-flex -space-x-px text-sm gap-2">
                        {items.links.map((link, index) => (
                            <li key={index}>
                                <ButtonLink
                                    dimension="sm"
                                    variant={
                                        link.active ? "secondary" : "outline"
                                    }
                                    href={link.url}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                ></ButtonLink>
                                {/* <Link
                                    href={link.url}
                                    className={`relative inline-flex items-center px-4 py-2 border ${
                                        link.active
                                            ? "z-10 bg-indigo-600 text-muted-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                                    } ${index === 0 ? "rounded-l-md" : ""} ${
                                        index === paginate.links.length - 1
                                            ? "rounded-r-md"
                                            : ""
                                    }`}
                                /> */}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};
