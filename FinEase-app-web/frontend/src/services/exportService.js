import { Parser } from 'json2csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const exportCSV = (transactions) => {
  const parser = new Parser();
  const csv = parser.parse(transactions);
  const blob = new Blob([csv], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'transactions.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportPDF = (transactions) => {
  const doc = new jsPDF();
  doc.text('Liste des Transactions', 10, 10);
  const tableData = transactions.map(t => [t.type, t.category, t.amount + '€', t.date]);
  
  doc.autoTable({
    head: [['Type', 'Catégorie', 'Montant', 'Date']],
    body: tableData,
  });

  doc.save('transactions.pdf');
};
