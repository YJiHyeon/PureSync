package com.fcc.PureSync.common;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BaseDto {
	protected int pg;
	protected int start = 0;
	protected int rnum;
	protected String searchKey="";
	protected String SearchText="";
	
//	public int getPg() {
//		return pg;
//	}
//	public void setPg(int pg) {
//		this.pg = pg;
//	}
//	public int getRnum() {
//		return rnum;
//	}
//	public void setRnum(int rnum) {
//		this.rnum = rnum;
//	}
//	public String getSearchKey() {
//		return searchKey;
//	}
//	public void setSearchKey(String searchKey) {
//		this.searchKey = searchKey;
//	}
//	public String getSearchText() {
//		return SearchText;
//	}
//	public void setSearchText(String searchText) {
//		SearchText = searchText;
//	}
//
	
}
