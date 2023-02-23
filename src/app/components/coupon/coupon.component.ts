import { formatDate } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {

  title = 'assignment';
  coupon_types=['User','option2','option3'];
  availability='';
  availArray=['unlimited','limited'];
  discountArray=['percentage','custom option'];
  statusArr=['Active','Inactive'];
  is_valid=true;


  couponForm:FormGroup= new FormGroup({
    coupon_type:new FormControl('',Validators.required),
    coupon_code:new FormControl('',Validators.required),
    valid_from:new FormControl('',Validators.required),
    valid_to:new FormControl('',Validators.required),
    is_active:new FormControl(null),
    coupon_count:new FormControl(null),
    is_unlimited:new FormControl(null,Validators.required),
    tnc:new FormControl(''),
    coupon_status:new FormControl('',Validators.required),
    rules:this.fb.array([])
  });

  constructor(private fb:FormBuilder,
    private cd:ChangeDetectorRef) { 

}


  ngOnInit(): void {
    this.addMore();
    let obj={
      name:"NAvs",
      id:23,
      isAbsent:null
    };

    
    
  }
  cleanObject (obj: any) {
    Object.keys(obj).forEach(k =>
      (obj[k] && typeof obj[k] === 'object') && this.cleanObject(obj[k]) ||
      (!obj[k] && obj[k] !== undefined) && delete obj[k]
    )
    return obj
  }

  get ruleArray(): { [key: string]:  any} {
    return this.couponForm.get('rules') as FormArray;
  }
  addMore(){
    const ruleSet=this.fb.group({
      min_amount:new FormControl('',[Validators.required,Validators.pattern("^[0-9]*$")]),
      max_amount:new FormControl('',[Validators.required,Validators.pattern("^[0-9]*$")]),
      discount_type :new FormControl('',Validators.required),
      discount:new FormControl('',[Validators.required,Validators.pattern("^[0-9]*$")]),
      max_discount:new FormControl('',Validators.pattern("^[0-9]*$"))
    });
    let ruleArr=this.couponForm.get('rules') as FormArray;
    ruleArr.push(ruleSet);
  }

  saveForm(){
    if(!this.couponForm.valid){
      alert("Please fill all the fields correctly !")
    }
    else{
      const form=this.couponForm.value;
      let res={
        "coupon_code":form.coupon_code,
        "coupon_type":form.coupon_type,
        "valid_from": formatDate(form.valid_from ,'dd-MM-yy','en_US'),
        "valid_to":formatDate(form.valid_to ,'dd-MM-yy','en_US'),
        "is_active":form.is_active,
        "coupon_count":form.coupon_count,
        "is_unlimited":form.is_unlimited,
        "tnc":form.tnc,
        "rules":form.rules
      }
      this.cleanObject(res)
      console.log("Your Form has beed Submitted Successfully", res);
    }
    
 
    
  }
  select(val:any,type:string){
    let form=this.couponForm.value;

    if(type==='coupon_type'){
      form.coupon_type=val;
    }
    else if (type==='availability'){
      this.availability=val;
      form.is_unlimited = val!=='unlimited' ? true :false;
      console.log(form.is_unlimited);
      
      if(form.is_unlimited){
       form.coupon_count= val
      }
      else{
        form.coupon_count=null;
      }
    }
    else if (type==='couponstatus'){  
      form.coupon_status =val;   
      form.is_active = form.coupon_status==='Active' ? true : false;
    }
    this.cd.detectChanges(); 
  }
  
 get f(): {[key:string]:AbstractControl} {
  return this.couponForm.controls;
 }
 get coupon_code():FormControl{
  return this.couponForm.get('coupon_code') as FormControl
 }
 get coupon_type():FormControl{
  return this.couponForm.get('coupon_type') as FormControl
 }
 get is_unlimited():FormControl{
  return this.couponForm.get('is_unlimited') as FormControl
 }
 get coupon_status():FormControl{
  return this.couponForm.get('coupon_status') as FormControl
 }
 get coupon_count():FormControl{
  return this.couponForm.get('coupon_count') as FormControl

 }

}
