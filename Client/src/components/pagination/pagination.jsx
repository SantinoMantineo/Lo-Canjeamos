/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import styles from './Pagination.module.css';

export default function Paginado({ allCard, cardPerPage, paginado, currentPage }) {
    const [displayPages, setDisplayPages] = useState([]);
    const [inputPage, setInputPage] = useState("");
    const [errorInput, setErrorInput] = useState("");

    useEffect(() => {
        const totalPages = Math.ceil(allCard / cardPerPage);
        const maxDisplayPages = 8;
        let startPage = Math.max(currentPage - Math.floor(maxDisplayPages / 2), 1);
        let endPage = Math.min(startPage + maxDisplayPages - 1, totalPages);

        if (endPage - startPage < maxDisplayPages - 1) {
            startPage = Math.max(endPage - maxDisplayPages + 1, 1);
        }

        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        setDisplayPages(pages);
    }, [currentPage, allCard, cardPerPage]);

    const handleInputChange = (event) => {
        setInputPage(event.target.value);
        setErrorInput("");
    };

    const handleGoToPage = () => {
        const pageNumber = parseInt(inputPage, 10);
        if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= Math.ceil(allCard / cardPerPage)) {
            paginado(pageNumber);
            setInputPage("");
        } else {
            setErrorInput("Only numbers within the range");
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleGoToPage();
        }
    };

    const handleNextPage = () => {
        paginado(currentPage + 1);
    };

    const handlePrevPage = () => {
        paginado(currentPage - 1);
    };

    return (
        <div className={styles.paginationContainer}>
            <ul className={styles.paginationList}>
                <li className={styles.paginationListItem}>
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className={styles.paginationButton}
                    >
                        {"<"}
                    </button>
                </li>
                {displayPages.map((number) => (
                    <li key={number} className={styles.paginationListItem}>
                        <button
                            onClick={() => paginado(number)}
                            className={styles.paginationButton}
                        >
                            {number}
                        </button>
                    </li>
                ))}
                <li className={styles.paginationListItem}>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === Math.ceil(allCard / cardPerPage)}
                        className={styles.paginationButton}
                    >
                        {">"}
                    </button>
                </li>
                <li className={styles.paginationListItem}>
                    <p>
                        {currentPage} / {Math.ceil(allCard / cardPerPage)}
                    </p>
                </li>
                
                <p className={styles.paginationError} disabled={!errorInput}>
                    {errorInput && errorInput}
                </p>
            </ul>
        </div>
    );
}


