/**
 * RFC 4180 compliant CSV parser.
 * Handles: quoted fields, embedded commas, embedded newlines, escaped quotes ("").
 */
export function parseCSV(content: string): Record<string, string>[] {
  const normalized = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const rows = tokenize(normalized);

  if (rows.length === 0) return [];

  const headers = rows[0].map((h) => h.trim());
  return rows
    .slice(1)
    .filter((row) => row.some((cell) => cell.trim() !== ''))
    .map((row) => {
      const record: Record<string, string> = {};
      headers.forEach((header, i) => {
        record[header] = row[i] ?? '';
      });
      return record;
    });
}

function tokenize(input: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let field = '';
  let inQuotes = false;
  let i = 0;

  while (i < input.length) {
    const ch = input[i];

    if (inQuotes) {
      if (ch === '"') {
        if (input[i + 1] === '"') {
          field += '"';
          i += 2;
        } else {
          inQuotes = false;
          i++;
        }
      } else {
        field += ch;
        i++;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
        i++;
      } else if (ch === ',') {
        currentRow.push(field);
        field = '';
        i++;
      } else if (ch === '\n') {
        currentRow.push(field);
        rows.push(currentRow);
        currentRow = [];
        field = '';
        i++;
      } else {
        field += ch;
        i++;
      }
    }
  }

  // Flush last field/row
  if (field !== '' || currentRow.length > 0) {
    currentRow.push(field);
    rows.push(currentRow);
  }

  return rows;
}
