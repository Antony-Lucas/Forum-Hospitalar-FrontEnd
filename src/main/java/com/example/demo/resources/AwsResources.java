package com.example.demo.resources;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.apigateway.model.Model;
import com.amazonaws.services.s3.model.S3Object;
import com.example.demo.repositories.AwsMetaData;
import com.example.demo.services.AwsMetaDataService;
import com.example.demo.services.AwsServices;

@RestController
public class AwsResources {
	@Autowired
	private AwsServices s3Services;
	@Autowired
	private AwsMetaDataService awsMetaData;
	
	@GetMapping("dashboard")
	public String dashboard(org.springframework.ui.Model model) {
		var files = awsMetaData.list();
		model.addAttribute("files", files);
		return "dashboard";
	}
	
	@GetMapping("list")
	public List<String> getAllFiles(){
		return s3Services.listAllFiles();
	}
	
	@PostMapping("upload")
	public String upload(@RequestParam("file") MultipartFile file) throws IOException{
		awsMetaData.upload(file);
		return "redirect:/dashboard";
	}
	
	@GetMapping("download/{id}")
	@ResponseBody
	public HttpEntity<byte[]> download(org.springframework.ui.Model model, @PathVariable int id, HttpServletResponse response) throws IOException{
		S3Object s3Object = awsMetaData.download(id);
		String ContentType = s3Object.getObjectMetadata().getContentType();
		var bytes = s3Object.getObjectContent().readAllBytes();
		
		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.setContentType(MediaType.valueOf(ContentType));
		httpHeaders.setContentLength(bytes.length);
		
		return new HttpEntity<byte[]>(bytes, httpHeaders);
	}
	
	@DeleteMapping("{filename}")
	public String deletefile(@PathVariable("filename") String filename) {
		return s3Services.deleteFile(filename);
	}
}
