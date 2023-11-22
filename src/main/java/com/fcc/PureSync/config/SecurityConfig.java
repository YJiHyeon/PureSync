package com.fcc.PureSync.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        //Authorization 헤더를 통한 인증 사용하지 않음
        http.httpBasic(config -> config.disable());
        //폼을 통한 인증 사용하지 않음
        http.formLogin(config -> config.disable());
        //CORS 설정
        http.cors(config -> config.disable());
        //사이트간 요청 위조 방지 비활성화
        http.csrf(config -> config.disable());
        //서버 세션 비활성화
        http.sessionManagement(management -> management
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }
}
