package com.example.demo.repositories;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface AwsServicesImpl {
	String saveFile(MultipartFile file);
	byte[] downloadFile(String fileName);
	String deleteFile(String fileName);
	List<String> listAllFiles();
}
