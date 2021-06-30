package com.one.shade.config.jwt;

import com.one.shade.config.auth.PrincipalDetails;
import com.one.shade.config.auth.PrincipalDetailsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


public class JWTCheckFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JWTCheckFilter.class);

    @Autowired
    private com.one.shade.util.JWTUtil JWTUtil;
    @Autowired
    private PrincipalDetailsService principalDetailsService;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        try {
            String jwtToken = requestTokenHeader(request);

            if (jwtToken != null && JWTUtil.validateToken(jwtToken)) {
                String username = JWTUtil.getUsernameFromToken(jwtToken);
                PrincipalDetails principalDetails = (PrincipalDetails) principalDetailsService.loadUserByUsername(username);

                Authentication authentication = new UsernamePasswordAuthenticationToken(
                        principalDetails, null, principalDetails.getAuthorities()
                );
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception e) {
            logger.error("Cannot set user authentication: {}", e);
        }
        filterChain.doFilter(request,response);
    }


    private String requestTokenHeader(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7, bearerToken.length());
        }
        return null;
    }
}
