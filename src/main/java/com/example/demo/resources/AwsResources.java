package com.example.demo.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.services.AwsServices;

@RestController
public class AwsResources {
	@Autowired
	private AwsServices s3Services;
	
	@GetMapping("download/{filename}")
	public ResponseEntity<byte[]> download(@PathVariable("filename") String filename) {
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-type", MediaType.ALL_VALUE);
		headers.add("Content-Disposition", "attachment; filename="+filename);
		byte[] bytes = s3Services.downloadFile(filename);
		return ResponseEntity.ok().headers(headers).body(bytes);
	}
	
	@GetMapping("list")
	public List<String> getAllFiles(){
		return s3Services.listAllFiles();
	}
	
	@PostMapping("upload")
	public String upload(@RequestParam("file") MultipartFile file) {
		return s3Services.saveFile(file);
	}
	
	@DeleteMapping("{filename}")
	public String deletefile(@PathVariable("filename") String filename) {
		return s3Services.deleteFile(filename);
	}
}
