// import React, { useEffect, useState } from 'react';
// import '../src/style/Pagination.css';

// function Pagination({ totalPages = 6, totalElement = 0, onSelect }) {  //{ totalPages = 100 }  //    { formData, onSelect }

//     const count = Math.ceil(totalElement / totalPages)

//     const [currentPage, setCurrentPage] = useState(1);


//     useEffect(() => {
//         onSelect(currentPage);
//     }, [currentPage, onSelect]);

//     const goToPage = (page) => {
//         if (page >= 1 && page <= totalPages) {  // totalpage
//             setCurrentPage(page);
//             //onSelect(currentPage)
//         }
//     };

//     const renderPages = () => {
//         const pages = [];

//         // İlk 4 səhifə
//         // if (totalElement)

//         for (let i = 1; i <= 4; i++) {  // 4
//             pages.push(
//                 <li
//                     key={i}
//                     className={`page ${currentPage === i ? 'active' : ''}`}
//                     onClick={() => goToPage(i)}
//                 >
//                     {i}
//                 </li>
//             );
//         }

//         // Ortada aktiv səhifə (əgər 5+ səhifədirsə)
//         if (currentPage > 4 && currentPage < totalPages - 2) {
//             pages.push(<li key="dots1" className="dots">...</li>);
//             pages.push(
//                 <li key={currentPage} className="page active">
//                     {currentPage}
//                 </li>
//             );
//             pages.push(<li key="dots2" className="dots">...</li>);
//         } else if (currentPage >= totalPages - 2) {
//             pages.push(<li key="dots1" className="dots">...</li>);
//         }

//         // Sonuncu səhifə
//         pages.push(
//             <li
//                 key={totalPages}
//                 className={`page ${currentPage === totalPages ? 'active' : ''}`}
//                 onClick={() => goToPage(totalPages)}
//             >
//                 {totalPages}
//             </li>
//         );
//         // onSelect(currentPage)
//         return pages;
//     };



//     return (
//         <div className="pagination-container">
//             <button
//                 className="nav-button"
//                 onClick={() => goToPage(currentPage - 1)}
//                 disabled={currentPage === 1}
//             >
//                 {'<'}
//             </button>

//             <ul className="pagination">{renderPages()}</ul>

//             <button
//                 className="nav-button"
//                 onClick={() => goToPage(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//             >
//                 {'>'}
//             </button>

//             <span className="results">
//                 {totalElement} Elandan {currentPage * totalElement}
//             </span>
//         </div>
//     );
// };

// export default Pagination;


// import React, { useEffect, useState } from 'react';
// import '../src/style/Pagination.css';

// function Pagination({ totalPages = 1, totalElement = 0, onSelect }) {
//     const [currentPage, setCurrentPage] = useState(1);

//     useEffect(() => {
//         onSelect(currentPage);
//     }, [currentPage]);

//     const goToPage = (page) => {
//         if (page !== currentPage && page >= 1 && page <= totalPages) {
//             setCurrentPage(page);
//         }
//     };

//     const renderPages = () => {
//         const pages = [];

//         // 1-4 arası səhifələr
//         for (let i = 1; i <= Math.min(4, totalPages); i++) {
//             pages.push(
//                 <li
//                     key={`page-${i}`}
//                     className={`page ${currentPage === i ? 'active' : ''}`}
//                     onClick={() => goToPage(i)}
//                 >
//                     {i}
//                 </li>
//             );
//         }

//         // Ortada aktiv səhifə və nöqtələr
//         if (totalPages > 5) {
//             if (currentPage > 4 && currentPage < totalPages - 1) {
//                 pages.push(<li key="dots1" className="dots">...</li>);
//                 pages.push(
//                     <li
//                         key={`middle-${currentPage}`}
//                         className="page active"
//                         onClick={() => goToPage(currentPage)}
//                     >
//                         {currentPage}
//                     </li>
//                 );
//                 pages.push(<li key="dots2" className="dots">...</li>);
//             } else if (currentPage >= totalPages - 1) {
//                 pages.push(<li key="dots3" className="dots">...</li>);
//             }

//             // Sonuncu səhifə
//             pages.push(
//                 <li
//                     key={`page-${totalPages}`}
//                     className={`page ${currentPage === totalPages ? 'active' : ''}`}
//                     onClick={() => goToPage(totalPages)}
//                 >
//                     {totalPages}
//                 </li>
//             );
//         }

//         return pages;
//     };

//     return (
//         <div className="pagination-container">
//             <button
//                 className="nav-button"
//                 onClick={() => goToPage(currentPage - 1)}
//                 disabled={currentPage === 1}
//             >
//                 {'<'}
//             </button>

//             <ul className="pagination">{renderPages()}</ul>

//             <button
//                 className="nav-button"
//                 onClick={() => goToPage(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//             >
//                 {'>'}
//             </button>

//             <span className="results">
//                 {totalElement} elandan {(currentPage - 1) * (totalElement / totalPages)}–{Math.min(currentPage * (totalElement / totalPages), totalElement)}
//             </span>
//         </div>
//     );
// }

// export default Pagination;


// // import React, { useEffect, useState } from 'react';
// // import '../src/style/Pagination.css';

// // function Pagination({ totalElement = 0, pageSize = 6, onSelect }) {
// //     const pagesCount = Math.ceil(totalElement / pageSize);
// //     const [currentPage, setCurrentPage] = useState(1);

// //     useEffect(() => {
// //         onSelect(currentPage);
// //     }, [currentPage, onSelect]);

// //     const goToPage = (page) => {
// //         if (page >= 1 && page <= pagesCount) {
// //             setCurrentPage(page);
// //         }
// //     };

// //     const renderPages = () => {
// //         const pages = [];

// //         if (pagesCount <= 5) {
// //             for (let i = 1; i <= pagesCount; i++) {
// //                 pages.push(
// //                     <li
// //                         key={i}
// //                         className={`page ${currentPage === i ? 'active' : ''}`}
// //                         onClick={() => goToPage(i)}
// //                     >
// //                         {i}
// //                     </li>
// //                 );
// //             }
// //         } else {
// //             if (currentPage > 2) {
// //                 pages.push(
// //                     <li key={1} className="page" onClick={() => goToPage(1)}>
// //                         1
// //                     </li>
// //                 );
// //                 if (currentPage > 3) {
// //                     pages.push(<li key="dots1" className="dots">...</li>);
// //                 }
// //             }

// //             for (let i = currentPage - 1; i <= currentPage + 1; i++) {
// //                 if (i > 1 && i < pagesCount) {
// //                     pages.push(
// //                         <li
// //                             key={i}
// //                             className={`page ${currentPage === i ? 'active' : ''}`}
// //                             onClick={() => goToPage(i)}
// //                         >
// //                             {i}
// //                         </li>
// //                     );
// //                 }
// //             }

// //             if (currentPage < pagesCount - 2) {
// //                 pages.push(<li key="dots2" className="dots">...</li>);
// //             }

// //             if (currentPage < pagesCount) {
// //                 pages.push(
// //                     <li
// //                         key={pagesCount}
// //                         className={`page ${currentPage === pagesCount ? 'active' : ''}`}
// //                         onClick={() => goToPage(pagesCount)}
// //                     >
// //                         {pagesCount}
// //                     </li>
// //                 );
// //             }
// //         }

// //         return pages;
// //     };

// //     return (
// //         <div className="pagination-container">
// //             <button
// //                 className="nav-button"
// //                 onClick={() => goToPage(currentPage - 1)}
// //                 disabled={currentPage === 1}
// //             >
// //                 {'<'}
// //             </button>

// //             <ul className="pagination">{renderPages()}</ul>

// //             <button
// //                 className="nav-button"
// //                 onClick={() => goToPage(currentPage + 1)}
// //                 disabled={currentPage === pagesCount}
// //             >
// //                 {'>'}
// //             </button>

// //             <span className="results">
// //                 Ümumi: {totalElement} nəticə, Səhifə: {currentPage} / {pagesCount}
// //             </span>
// //         </div>
// //     );
// // }

// // export default Pagination;



// import React, { useEffect, useState } from 'react';
// import '../src/style/Pagination.css';

// function Pagination({ totalPages = 1, totalElement = 0, onSelect }) {
//     const [currentPage, setCurrentPage] = useState(1);

//     useEffect(() => {
//         onSelect(currentPage);
//     }, [currentPage]);

//     useEffect(() => {
//         setCurrentPage(1); // Reset page if totalPages change
//     }, [totalPages]);

//     const goToPage = (page) => {
//         if (page >= 1 && page <= totalPages) setCurrentPage(page);
//     };

//     const renderPages = () => {
//         const pages = [];

//         const maxVisiblePages = 5;
//         const start = Math.max(currentPage - 2, 1);
//         const end = Math.min(start + maxVisiblePages - 1, totalPages);

//         if (start > 1) pages.push(<li key="start-dots" className="dots">...</li>);

//         for (let i = start; i <= end; i++) {
//             pages.push(
//                 <li
//                     key={i}
//                     className={`page ${currentPage === i ? 'active' : ''}`}
//                     onClick={() => goToPage(i)}
//                 >
//                     {i}
//                 </li>
//             );
//         }

//         if (end < totalPages) pages.push(<li key="end-dots" className="dots">...</li>);

//         return pages;
//     };

//     return (
//         <div className="pagination-container">
//             <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>{'<'}</button>
//             <ul className="pagination">{renderPages()}</ul>
//             <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>{'>'}</button>
//             <span className="results">{totalElement} nəticə</span>
//         </div>
//     );
// }

// export default Pagination;


import React, { useEffect, useState } from 'react';
import '../src/style/Pagination.css';

function Pagination({ totalPages = 1, totalElement = 0, onSelect }) {
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        onSelect(currentPage);
    }, [currentPage]);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const renderPages = () => {
        const pages = [];
        const maxVisiblePages = 5;

        const start = Math.max(1, currentPage - 2);
        const end = Math.min(totalPages, start + maxVisiblePages - 1);

        for (let i = start; i <= end; i++) {
            pages.push(
                <li
                    key={i}
                    className={`page ${currentPage === i ? 'active' : ''}`}
                    onClick={() => goToPage(i)}
                >
                    {i}
                </li>
            );
        }

        return pages;
    };

    return (
        <div className="pagination-container">
            <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                {'<'}
            </button>
            <ul className="pagination">{renderPages()}</ul>
            <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
                {'>'}
            </button>
            <span className="results">
                {totalElement} nəticə
            </span>
        </div>
    );
}

export default Pagination;
