import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ 
  currentPage = 1, 
  totalPages = 253, 
  itemsPerPage = 12,
  totalItems = 3036,
  onPageChange = () => {}
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <>
      <style>{`
        .pagination-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          background-color: #f9fafb;
          border-top: 1px solid #e5e7eb;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .pagination-info {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: #374151;
        }

        .pagination-controls {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .pagination-button {
          padding: 8px;
          border-radius: 6px;
          border: 1px solid #d1d5db;
          background-color: white;
          color: #374151;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pagination-button:hover:not(:disabled) {
          background-color: #f3f4f6;
          border-color: #9ca3af;
        }

        .pagination-button:disabled {
          border-color: #e5e7eb;
          color: #9ca3af;
          cursor: not-allowed;
          background-color: white;
        }

        .pagination-button svg {
          width: 16px;
          height: 16px;
        }

        /* Demo styles */
        .demo-container {
          max-width: 1024px;
          margin: 32px auto;
        }

        .demo-content {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
        }

        .demo-header {
          padding: 32px;
        }

        .demo-title {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 16px;
          color: #111827;
        }

        .demo-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        .demo-item {
          padding: 16px;
          background-color: #f3f4f6;
          border-radius: 8px;
        }

        .demo-item-line {
          height: 16px;
          background-color: #d1d5db;
          border-radius: 4px;
          margin-bottom: 8px;
        }

        .demo-item-line:last-child {
          height: 12px;
          width: 75%;
          margin-bottom: 0;
        }

        .demo-status {
          margin-top: 16px;
          text-align: center;
          color: #6b7280;
        }

        @media (max-width: 640px) {
          .pagination-container {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
          }

          .pagination-controls {
            align-self: flex-end;
          }
        }
      `}</style>
      
      <div className="pagination-container">
        <div className="pagination-info">
          <span>
            Showing {startItem}-{endItem} of {totalItems.toLocaleString()}
          </span>
        </div>
        
        <div className="pagination-controls">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="pagination-button"
            aria-label="Previous page"
          >
            <ChevronLeft />
          </button>
          
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="pagination-button"
            aria-label="Next page"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </>
  );
};


export default Pagination;