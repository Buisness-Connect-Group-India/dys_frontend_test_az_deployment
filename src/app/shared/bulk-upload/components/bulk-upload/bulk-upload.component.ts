import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-bulk-upload',
  standalone: false,
  templateUrl: './bulk-upload.component.html',
  styleUrl: './bulk-upload.component.scss'
})
export class BulkUploadComponent {
  constructor(private messageService: NzMessageService) { }

  handleChange({ file, fileList }: NzUploadChangeParam): void {
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      // this.messageService.success(`${file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      // this.messageService.error(`${file.name} file upload failed.`);
    }
  }
}
