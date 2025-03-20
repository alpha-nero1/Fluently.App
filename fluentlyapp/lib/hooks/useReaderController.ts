import { useEffect, useMemo, useState } from "react";

interface ReaderControllerOptions {
    spans: string[][];
    pageWindow?: number;
    charsPerLine: number;
    linesPerPage: number;
}

export interface IReaderController {
    totalPages: number;
    page: number;
    cursor: number;
    totalSpans: number;
    pages: string[][][];
    setPage: (newPage: number) => void;
    // Completion from 0 to 1.
    complete: number;
}

const getPages = (content: string[][], charsPerLine: number, linesPerPage: number): string[][][] => {
    const pages: string[][][] = [];
    let currentPage: string[][] = [];
    let currentLine: string[] = [];
    let currentLineLength = 0;

    for (const wordArray of content) {
        for (const word of wordArray) {
            if (word === '') continue;
            if (currentLineLength + word.length + (currentLine.length > 0 ? 1 : 0) <= charsPerLine) {
                // Add word to current line
                currentLine.push(word);
                currentLineLength += word.length + (currentLine.length > 1 ? 1 : 0); // Add space between words
            } else {
                // Push the full line to the current page
                currentPage.push(currentLine);
                currentLine = [word]; // Start a new line with the current word
                currentLineLength = word.length;

                // If the page is full, start a new page
                if (currentPage.length >= linesPerPage) {
                    pages.push(currentPage);
                    currentPage = [];
                }
            }
        }

        // Push the last line of the paragraph if not empty
        if (currentLine.length > 0) {
            currentPage.push(currentLine);
            currentLine = [];
            currentLineLength = 0;
        }

        // If the page is full, move to a new page
        if (currentPage.length >= linesPerPage) {
            pages.push(currentPage);
            currentPage = [];
        }
    }

    // Push any remaining content as the last page
    if (currentPage.length > 0) {
        pages.push(currentPage);
    }

    return pages;
}

type ReaderContext = {
    pages: string[][][];
    cursorIndices: number[];
}

export const useReaderController = (opts: ReaderControllerOptions) => {
    const { spans, charsPerLine, linesPerPage } = opts;
    const [page, setPage] = useState(0);

    // Compute pages and cursor indices only when spans, charsPerLine, or linesPerPage change
    const { pages, cursorIndices } = useMemo<ReaderContext>(() => {
        const pages = getPages(spans, charsPerLine, linesPerPage);
        const cursorIndices: number[] = [];
        let wordCount = 0;

        pages.forEach((page) => {
            page.forEach((line) => {
                line.forEach(() => {
                    wordCount += 1;
                });
            });
            cursorIndices.push(wordCount);
        });

        return { pages, cursorIndices };
    }, [spans, charsPerLine, linesPerPage]);

    const cursor = cursorIndices[page] || 0;
    const totalSpans = cursorIndices[cursorIndices.length - 1] + 1;

    return {
        totalPages: pages.length,
        page,
        cursor,
        totalSpans,
        pages,
        setPage,
        complete: ((page + 1) / pages.length)
    }
}