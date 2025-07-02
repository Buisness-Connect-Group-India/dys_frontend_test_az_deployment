import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-complaint-attachment',
  standalone: false,
  templateUrl: './complaint-attachment.component.html',
  styleUrl: './complaint-attachment.component.scss'
})
export class ComplaintAttachmentComponent implements OnInit {

  data = [
    { type: 'Service' },
    { type: 'Invoice' },
    { type: 'Claim' }
  ];

  documentsMap: Record<string, string[]> = {
    Service: ['Service_001.csv', 'Service_002.xlsx', 'Service_003.jpg', 'Service_004.pdf'],
    Invoice: ['Invoice_001.pdf', 'Invoice_002.png', 'Invoice_003.pdf', 'Invoice_004.pdf'],
    Claim: ['Claim_001.pdf']
  };

  selectedType: string | null = 'Service';
  selectedDocuments: any[] = [];

  ngOnInit(): void {
    this.selectType('Service')
  }
  
  selectType(type: string): void {
    this.selectedType = type;
    const fileNames = this.documentsMap[type] || [];
    this.selectedDocuments = fileNames.map(name => {
      const extension = name.split('.').pop()?.toLowerCase() || 'file';
      return {
        name,
        type: extension,
        size: this.getFileSize(name), 
        date: this.getFileDate(name)  
      };
    });
  }

  getFileSize(fileName: string): string {
    const sizeMap: Record<string, string> = {
      pdf: '1.2 MB',
      jpg: '300 KB',
      jpeg: '300 KB',
      png: '400 KB',
      csv: '500 KB',
      xlsx: '900 KB'
    };

    const ext = fileName.split('.').pop()?.toLowerCase() || '';
    return sizeMap[ext] || '800 KB';
  }

  getFileDate(fileName: string): string {
    const daysAgo = Math.floor(Math.random() * 10);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toISOString().split('T')[0]; // format: YYYY-MM-DD
  }

  getFileIcon(type: string): string {
    switch (type.toLowerCase()) {
      case 'pdf': return 'file-pdf';
      case 'csv': return 'file-text';
      case 'xlsx': return 'file-excel';
      case 'jpg': return 'file-jpg'
      case 'jpeg': return 'file-image'
      case 'png': return 'file-image';
      default: return 'file';
    }
  }


}
