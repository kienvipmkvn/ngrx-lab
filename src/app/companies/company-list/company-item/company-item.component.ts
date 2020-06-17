import { Component, OnInit, Input } from '@angular/core';
import { Company } from '../../company.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-item',
  templateUrl: './company-item.component.html',
  styleUrls: ['./company-item.component.css']
})
export class CompanyItemComponent implements OnInit {
  @Input() company: Company;
  @Input() id: number;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
}
