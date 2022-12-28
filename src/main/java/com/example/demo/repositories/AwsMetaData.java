package com.example.demo.repositories;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.model.S3Object;
import com.example.demo.entities.Aws;

public interface AwsMetaData {
	public String upload(MultipartFile file, String url) throws IOException;
	public S3Object download(int id);
	public List<Aws> list();
}
