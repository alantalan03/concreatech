import { Injectable, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { EncryptDataService } from '../../security/encypt-data.service';
import { Data, DropdownMenu, ReturnMenu } from '../../interfaces/sidebar';
@Injectable({
	providedIn: 'root',
})
export class DataService implements OnInit, OnChanges {
	overviewChecked: boolean;
	alias_username: string;
	role: string;
	circle_profile: string;
	company: string;
	mode: string;
	data;
	menu_navbar: ReturnMenu[];
	dropMenu: DropdownMenu[];
	// * Get Export icon
	getIconBtnExport(bool: boolean): string {
		if (bool === true) {
			return 'icon-file-download';
		} else if (bool === false) {
			return 'icon-file-download-disabled';
		}
	}
	constructor(private securityLocalStorage: EncryptDataService) {
		let data = JSON.parse(
			this.securityLocalStorage.decryptData(localStorage.getItem('data'))
		);
		const userData = data;
		const company_name = userData.data_company.company_name;
		this.company = company_name;
		this.alias_username = userData.data_company.alias_username;
		this.role = userData.result.user_type;
		this.mode = localStorage.getItem('mode');
		this.data = userData;
		this.menu_navbar = userData.data_menu.return_menu;
		this.dropMenu = userData.data_menu.return_profiles;
	}
	ngOnInit() {
		let data = JSON.parse(
			this.securityLocalStorage.decryptData(localStorage.getItem('data'))
		);
		const userData: Data = data;
		const company_name = userData.data_company.company_name;
		this.company = company_name;
		this.alias_username = userData.data_company.alias_username;
		this.role = userData.result.user_type;
		this.mode = localStorage.getItem('mode');
		this.data = userData;
		this.menu_navbar = userData.data_menu.return_menu;
		this.dropMenu = userData.data_menu.return_profiles;
	}
	ngOnChanges(changes: SimpleChanges): void {
		let data = JSON.parse(
			this.securityLocalStorage.decryptData(localStorage.getItem('data'))
		);
		const userData: Data = data;
		const company_name = userData.data_company.company_name;
		this.company = company_name;
		this.alias_username = userData.data_company.alias_username;
		this.role = userData.result.user_type;
		this.mode = localStorage.getItem('mode');
		this.data = userData;
		this.menu_navbar = userData.data_menu.return_menu;
		this.dropMenu = userData.data_menu.return_profiles;
	}
}
