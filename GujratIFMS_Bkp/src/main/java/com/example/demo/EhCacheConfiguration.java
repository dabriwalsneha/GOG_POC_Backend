package com.example.demo;

import org.springframework.cache.CacheManager;
import org.springframework.cache.ehcache.EhCacheCacheManager;
import org.springframework.cache.ehcache.EhCacheManagerFactoryBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

@Configuration
public class EhCacheConfiguration {
	
	private static final String EHCACHE_FILE="ehcache.xml";
	
	  @Bean 
	  public CacheManager cacheManager() {
		return new EhCacheCacheManager(cacheManagerFactory().getObject());
		  }
	  
	  @Bean 
	  public EhCacheManagerFactoryBean cacheManagerFactory() {
	  EhCacheManagerFactoryBean factory=new EhCacheManagerFactoryBean(); 
	  factory.setConfigLocation(new ClassPathResource(EHCACHE_FILE));
	  factory.setShared(true); 
	  return factory;
	  
	  }
	 
}
