package com.fcc.PureSync.dto;

import lombok.Getter;

@Getter
public class SignupDto {

    String memId;
    String memPassword;
    String memNick;
    String memEmail;
    String memBirth;
    String memGender;

    Double bodyHeight;
    Double bodyWeight;
    Double bodyWishWeight;
    Double bodyWishConscal;
    Double bodyWishBurncal;
}