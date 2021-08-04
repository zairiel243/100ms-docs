import React from 'react';
import SearchIcon from '@/assets/icons/SearchIcon';
import useSearch from '@/lib/useSearch';
import EnterIcon from '@/assets/icons/EnterIcon';
import useClickOutside from '@/lib/useClickOutside';

interface Props {
    docs: { url: string; title: string; description: string; nav: number; content: string }[];
    currentDocSlug: string;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchModal: React.FC<Props> = ({ docs, currentDocSlug, setModal }) => {
    const [search, setSearch] = React.useState('');
    const ref = React.useRef();
    const inputRef = React.useRef();
    // @ts-ignore
    useClickOutside(ref, () => setModal(false));
    React.useEffect(() => {
        // @ts-ignore
        inputRef.current?.focus();
    }, []);
    const res = useSearch({
        search,
        folder: currentDocSlug,
        docs
    });
    return (
        // @ts-ignore
        <div className="search-modal" ref={ref}>
            <div className="input-wrapper">
                <SearchIcon />
                <input
                    // @ts-ignore
                    ref={inputRef}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="Search docs"
                />
                <span className="esc">esc</span>
            </div>
            {res.length > 0 ? (
                <div className="res-ctx">
                    {res.map((e) => (
                        <a href={e.url} key={e.url}>
                            <div className="res-box">
                                <div>
                                    <span>{e.title}</span>
                                    <span className="slug">{e.url}</span>
                                </div>

                                <EnterIcon />
                            </div>
                        </a>
                    ))}
                </div>
            ) : null}
            <style jsx>{`
                .search-modal {
                    max-width: 600px;
                    width: 100%;
                    position: absolute;
                    top: 200px;
                    left: 50%;
                    transform: translate(-50%, 0%);
                    border-radius: 5px;
                    border: 1px solid var(--gray5);
                    background-color: var(--gray1);
                    z-index: 10;
                }
                .input-wrapper {
                    padding: 1rem;
                    display: flex;
                    align-items: center;
                    border-bottom: 1px solid var(--gray5);
                }
                .esc {
                    color: var(--gray8);
                    border-radius: 5px;
                    padding: 0 8px;
                    border: 1px solid var(--gray6);
                }
                input {
                    width: 100%;
                    margin-left: 1rem;
                }
                .res-ctx {
                    width: 100%;
                }
                .res-box:hover {
                    opacity: 0.8;
                }
                .res-box {
                    margin: 0.5rem 0;
                    padding: 0.25rem 2rem;
                    height: 50px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    opacity: 0.4;
                    background-color: var(--gray3);
                }
                .res-box div {
                    display: flex;
                    flex-direction: column;
                }
                .res-box .slug {
                    opacity: 0.6;
                }
                a {
                    color: inherit;
                    text-decoration: none;
                }
                a:hover {
                    opacity: 1;
                }
            `}</style>
        </div>
    );
};

export default SearchModal;
