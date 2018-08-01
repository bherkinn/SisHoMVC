<?php
	require_once("conexion.php");

	Class CargaCurso extends Conexion
	{
	    public function obtnerCursosPorCurricula()
	    {
	        $sql = "SELECT DISTINCT cursos.nomCurso,curricular.codCurso FROM curricular INNER JOIN cursos ON curricular.codCurso=cursos.codCurso WHERE curricular.verCurricular='2018-2'ORDER BY curricular.codCurso";
	        
	        $this->Conectar(2);
	        $this->memoria = $this->con2->query($sql);
	        if (!empty($this->memoria)) {
	            $datos = $this->memoria->fetchAll(PDO::FETCH_OBJ);
	            $this->Close(2);
	            
	            return $datos;
	            
	        } else {
	            
	            return "vacio";
	            
	        }
	    }
	    public function ObtenerCargaCursosT()
	    {
	        
	        $sql = "SELECT horariosfim.basehorarios.codCurso, horariosfim.basehorarios.secCurso,CONCAT(oeraae2018.docentes.apePaterno,' ', oeraae2018.docentes.apeMaterno,', ',oeraae2018.docentes.nombres) AS nombres,horariosfim.basehorarios.hora,horariosfim.basehorarios.teopra,oeraae2018.curricular.verCurricular FROM horariosfim.basehorarios INNER JOIN oeraae2018.docentes ON horariosfim.basehorarios.codDocente=oeraae2018.docentes.codDocente INNER JOIN oeraae2018.curricular ON oeraae2018.curricular.codCurso=horariosfim.basehorarios.codCurso WHERE oeraae2018.curricular.verCurricular='2018-2' AND horariosfim.basehorarios.estado=1 AND horariosfim.basehorarios.teopra='T' AND horariosfim.basehorarios.perAcademico='2018-2' ORDER BY horariosfim.basehorarios.codCurso,horariosfim.basehorarios.secCurso";
	        
	        $this->Conectar(1);
	        $this->memoria = $this->con1->query($sql);
	        if (!empty($this->memoria)) {
	            $datos = $this->memoria->fetchAll(PDO::FETCH_OBJ);
	            $this->Close(1);
	            
	            return $datos;
	            
	        } else {
	            
	            return "vacio";
	            
	        }
	    }
	    public function ObtenerCargaCursosP()
	    {
	        
	        $sql = "SELECT horariosfim.basehorarios.codCurso, horariosfim.basehorarios.secCurso,CONCAT(oeraae2018.docentes.apePaterno,' ', oeraae2018.docentes.apeMaterno,', ',oeraae2018.docentes.nombres) AS nombres,horariosfim.basehorarios.hora,horariosfim.basehorarios.teopra,oeraae2018.curricular.verCurricular FROM horariosfim.basehorarios INNER JOIN oeraae2018.docentes ON horariosfim.basehorarios.codDocente=oeraae2018.docentes.codDocente INNER JOIN oeraae2018.curricular ON oeraae2018.curricular.codCurso=horariosfim.basehorarios.codCurso WHERE oeraae2018.curricular.verCurricular='2018-2' AND horariosfim.basehorarios.estado=1 AND horariosfim.basehorarios.teopra='P' AND horariosfim.basehorarios.perAcademico='2018-2' ORDER BY horariosfim.basehorarios.codCurso,horariosfim.basehorarios.secCurso";
	        
	        $this->Conectar(1);
	        $this->memoria = $this->con1->query($sql);
	        if (!empty($this->memoria)) {
	            $datos = $this->memoria->fetchAll(PDO::FETCH_OBJ);
	            $this->Close(1);
	            
	            return $datos;
	            
	        } else {
	            
	            return "vacio";
	            
	        }
	    }
	}
?>