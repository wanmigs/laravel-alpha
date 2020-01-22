import React from "react";

const Pagination = ({ offset, limit, total, onPageChange }) => {
  const isFirstPage = () => {
    return offset === 0 || limit >= total;
  };

  const isLastPage = () => {
    return offset + limit >= total;
  };

  const totalPage = () => {
    return Math.ceil(total / limit);
  };

  const curPage = () => {
    return Math.ceil(offset / limit) + 1;
  };

  const dspBtns = () => {
    const n = totalPage();
    const i = curPage();
    /* eslint-disable */
    if (n <= 9)
      return (n => {
        const arr = Array(n);
        while (n) {
          arr[n - 1] = n--;
        }
        return arr;
      })(n);
    if (i <= 5) return [1, 2, 3, 4, 5, 6, 7, 0, n]; // 0 represents `···`
    if (i >= n - 4) return [1, 0, n - 6, n - 5, n - 4, n - 3, n - 2, n - 1, n];
    return [1, 0, i - 2, i - 1, i, i + 1, i + 2, 0, n];
    /* eslint-enable */
  };

  const handleClick = n => {
    let offset = (n - 1) * limit;
    onPageChange(offset);
  };

  const turnPage = i => {
    onPageChange(offset + i * limit);
  };

  return (
    <ul className="pagination flex flex-wrap list-none" name="Pagination">
      {!isFirstPage() && (
        <li className="flex mr-3 page-item" onClick={() => turnPage(-1)}>
          <button className="page-link flex items-center justify-center no-underline font-medium font-semibold">
            <i className="fa fa-arrow-left"></i>
          </button>
        </li>
      )}

      {dspBtns().map((button, i) => (
        <li
          key={i}
          className={`flex mr-3 page-item ${
            button === curPage() ? "active text-gray-500" : "text-blue-600"
          }`}
        >
          {button ? (
            <button
              className="page-link flex items-center justify-center no-underline font-medium font-semibold"
              onClick={() => handleClick(button)}
            >
              {button}
            </button>
          ) : (
            <button className="page-link flex items-center justify-center no-underline font-medium font-semibold">
              <i className="fa fa-ellipsis-h"></i>
            </button>
          )}
        </li>
      ))}

      {!isLastPage() && (
        <li className="flex mr-3 page-item" onClick={() => turnPage(1)}>
          <button className="page-link flex items-center justify-center no-underline font-medium font-semibold">
            <i className="fa fa-arrow-right"></i>
          </button>
        </li>
      )}
    </ul>
  );
};

export default Pagination;
