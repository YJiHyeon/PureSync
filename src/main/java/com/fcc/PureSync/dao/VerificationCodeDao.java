package com.fcc.PureSync.dao;

import com.fcc.PureSync.common.constant.VerificationCodeConstant;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Repository;

import java.time.Duration;

@RequiredArgsConstructor
@Repository
public class VerificationCodeDao {
    private final StringRedisTemplate stringRedisTemplate;

    public void saveVerificationCode(String email, String verificationCode){
        stringRedisTemplate.opsForValue()
                .set(email,verificationCode,
                        Duration.ofSeconds(VerificationCodeConstant.EMAIL_VERIFICATION_LIMIT_SECONDS));
    }

    public String getVerificationCode(String email){
        return stringRedisTemplate.opsForValue().get(email);
    }

    public void deleteVerificationCode(String email){
        stringRedisTemplate.delete(email);
    }

    public boolean hasKey(String email) {
        Boolean keyExists = stringRedisTemplate.hasKey(email);
        return keyExists != null && keyExists;
    }

}